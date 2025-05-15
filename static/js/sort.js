function orderNames() {
  function getNames() {
    let elements;
    try {
      const regex = createRegex(
        DOMelements.inputSeparator.value,
        DOMelements.caseSensitive.checked,
        DOMelements.searchElements.checked
      );
      elements = DOMelements.searchElements.checked
        ? [...DOMelements.textarea.value.matchAll(regex)].map((match) => match[0])
        : DOMelements.textarea.value.split(regex);
    } catch (error) {
      warnings.regexpError = `Unrecognized regular expression: "${DOMelements.inputSeparator.value}".`;
      return false;
    }
    return DOMelements.deleteSpaces.checked ? trimElements(elements) : elements;
  }
  function printResult(sortedList) {
    const result = sortedList.join(DOMelements.outputSeparator.value).replace(/\\n/g, "\n");
    if (result != "") {
      DOMelements.resultElement.hidden = 0;
      DOMelements.resultElement.innerHTML = result;
    } else {
      warnings.empty = "Error. Empty result.";
      DOMelements.resultElement.hidden = 1;
    }
  }
  function printWarnings() {
    const messages = Object.values(warnings).filter(Boolean).join("\n");
    DOMelements.warningElement.hidden = !messages;
    DOMelements.warningElement.innerHTML = messages;
  }
  function sortList(lst) {
    lst.sort((a, b) => a[0].localeCompare(b[0]));
    const sorted = lst.map((ele) => textElements[ele[1]]);
    return DOMelements.reverse.checked ? sorted.reverse() : sorted;
  }
  function processNameOrder(textElements) {
    const sortingList = [];
    const warnings = { nameErrorsI: [] };

    textElements.forEach((ele, i) => {
      const inputtedWords = ele.split(" ").filter(Boolean);
      if (inputtedWords.length < 1 || inputtedWords.length > 4) {
        warnings.nameErrorsI.push(i);
        return;
      }

      const [firstName, middleName, ...lastNameParts] = inputtedWords;
      const lastName = lastNameParts.join(" ");
      const formattedName = [lastName, firstName, middleName].filter(Boolean).join(" ");
      sortingList.push([formattedName, i]);
    });
    return { sortingList, warnings };
  }
  let sortedList = [];
  //
  let warnings = {};
  const textElements = getNames();
  if (textElements) {
    let sortingList = [];
    if (DOMelements.nameOrder.checked) {
      const { sortingList: newSortingList, warnings: newWarnings } = processNameOrder(textElements);
      sortingList = newSortingList;
      warnings = { ...warnings, ...newWarnings };
    } else {
      sortingList = textElements.map((element, index) => [element, index]);
    }
    if (!DOMelements.caseSensitive.checked) {
      sortingList.forEach((item) => {
        item[0] = item[0].toUpperCase();
      });
    }
    sortedList = sortList(sortingList);
  }
  printResult(sortedList);
  printWarnings();
}
function createRegex(pattern, caseSensitive = false, global = false) {
  const flags = caseSensitive ? (global ? "g" : "") : global ? "gi" : "i";
  const cacheKey = `${pattern}-${flags}`;
  if (regexCache?.key === cacheKey) return regexCache.regex;
  const regex = new RegExp(pattern, flags);
  regexCache = { key: cacheKey, regex };
  return regex;
}
function trimElements(lst) {
  return lst.map((str) => str.replace(/^\s\s*/, "").replace(/\s\s*$/, ""));
}
const DOMelements = {
  resultElement: document.getElementById("sortNames.result"),
  warningElement: document.getElementById("sortNames.warning"),
  outputSeparator: document.getElementById("sortNames.output"),
  inputSeparator: document.getElementById("sortNames.input"),
  textarea: document.getElementById("sortNames.names"),
  searchElements: document.getElementById("sortNames.searchElements"),
  caseSensitive: document.getElementById("sortNames.caseSensitive"),
  deleteSpaces: document.getElementById("sortNames.deleteSpaces"),
  nameOrder: document.getElementById("sortNames.nameOrder"),
  reverse: document.getElementById("sortNames.reverse"),
};
orderNames();
