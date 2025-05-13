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
function orderNames() {
  let sortedList = [];
  //
  let warnings = { nameErrorsI: [] };
  const textElements = getNames();
  if (textElements != false) {
    let sortingList = [];
    if (DOMelements.nameOrder.checked) {
      const { sortingList: newSortingList, warnings: newWarnings } = processNameOrder(textElements);
      sortingList = newSortingList;
      warnings = { ...warnings, ...newWarnings };
    } else {
      for (let i = 0; i < textElements.length; i++) {
        sortingList.push([textElements[i], i]);
      }
    }
    if (!DOMelements.caseSensitive.checked) {
      for (let i = 0; i < sortingList.length; i++) {
        sortingList[i][0] = sortingList[i][0].toUpperCase();
      }
    }
    sortedList = sortList(sortingList);
  }
  printResult(sortedList);
  printWarnings();

  function getNames() {
    var elements;
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
      warnings.regexpError = DOMelements.inputSeparator.value;
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
      warnings.empty = true;
      DOMelements.resultElement.hidden = 1;
    }
  }
  function printWarnings() {
    const warningMessages = {
      regexpError: `Unrecognized regular expression: "${warnings.regexpError}"`,
      nameErrorsI: warnings.nameErrorsI.length
        ? `Elements ${warnings.nameErrorsI.join(", ")} have either too much or not enough arguments and are being ignored`
        : null,
      empty: "Error. Empty result",
    };

    const messages = Object.keys(warnings)
      .map((key) => warningMessages[key])
      .join("<br>");
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
}
function createRegex(pattern, caseSensitive, global = false) {
  const flags = caseSensitive ? (global ? "g" : "") : global ? "gi" : "i";
  return new RegExp(pattern, flags);
}
function trimElements(lst) {
  return lst.map((str) => str.replace(/^\s\s*/, "").replace(/\s\s*$/, ""));
}
orderNames();
