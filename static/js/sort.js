function orderNames() {
  function getNames() {
    let elements;
    try {
      const regex = createRegex(
        DOMelements.inputSeparator.value,
        DOMelements.caseSensitive.checked,
        DOMelements.searchElements.checked,
      );
      elements = DOMelements.searchElements.checked
        ? [...DOMelements.textarea.value.matchAll(regex)].map(
            (match) => match[0],
          )
        : DOMelements.textarea.value.split(regex);
    } catch {
      addWarning(
        "regexpError",
        `Unrecognized regular expression: "${DOMelements.inputSeparator.value}".`,
      );
      return false;
    }
    return DOMelements.deleteSpaces.checked ? trimElements(elements) : elements;
  }
  function unescapeInput(str) {
    return JSON.parse(`"${str.replace(/"/g, '\\"')}"`);
  }
  function printResult(sortedList) {
    const result = sortedList.join(
      unescapeInput(DOMelements.outputSeparator.value),
    );
    if (result !== "") {
      DOMelements.resultElement.hidden = 0;
      DOMelements.resultElement.innerHTML = result;
    } else {
      addWarning("empty", "Error. Empty result.");
      DOMelements.resultElement.hidden = 1;
    }
  }
  function printWarnings() {
    const messages = Object.values(warnings).filter(Boolean).join("\n");
    DOMelements.warningElement.hidden = !messages;
    DOMelements.warningElement.innerHTML = messages;
  }
  function sortList(lst) {
    // Sort the list based on the first element of each sub-array, that is, the name or element

if (DOMelements.sort.checked) {
  if (!DOMelements.caseSensitive.checked) {
    lst.sort((a, b) => {
      const ra = a[0].toUpperCase();
      const rb = b[0].toUpperCase();
      if (ra < rb) return -1;
      if (ra > rb) return 1;
      return 0;
    });
  } else {
    lst.sort();
  }
}
    // Return the orginal element, that is, the i stored on ele[1] of textElements
    const sorted = lst.map((ele) => textElements[ele[1]]);
    return DOMelements.reverse.checked ? sorted.reverse() : sorted;
  }
  function processNameOrder(textElements) {
    const sortingList = [];
    const nameErrorsI = [];

    textElements.forEach((ele, i) => {
      const inputtedWords = ele.split(" ").filter(Boolean);
      if (inputtedWords.length < 1 || inputtedWords.length > 4) {
        nameErrorsI.push(`${i} ("${ele}")`);
        return;
      }
      {
        let formattedName;
        if (inputtedWords.length === 2) {
          const [firstName, lastName] = inputtedWords;
          formattedName = [lastName, firstName].join(" ");
        } else {
          const [firstName, middleName, ...lastNameParts] = inputtedWords;
          const lastName = lastNameParts.join(" ");
          formattedName = [lastName, firstName, middleName]
            .filter(Boolean)
            .join(" ");
        }
        sortingList.push([formattedName, i]);
      }
    });
    if (nameErrorsI.length > 0) {
      addWarning(
        "nameErrorsI",
        `Invalid name format at indices: ${nameErrorsI.join(", ")}`,
      );
    }
    return sortingList;
  }
  function addWarning(key, message) {
    warnings[key] = message;
  }
  const warnings = {};
  let sortedList = [];
  const textElements = getNames();
  if (textElements) {
    let sortingList = [];
    if (DOMelements.nameOrder.checked) {
      sortingList = processNameOrder(textElements);
    } else {
      sortingList = textElements.map((element, index) => [element, index]);
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
  return lst.map((str) => str.trim());
}
let regexCache = null;
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
  sort: document.getElementById("sortNames.sort"),
};
orderNames();
