function orderNames() {
  function createRegex(pattern, caseSensitive, global = false) {
    const flags = caseSensitive ? (global ? "g" : "") : global ? "gi" : "i";
    return new RegExp(pattern, flags);
  }
  function getNames() {
    try {
      const regex = createRegex(
        DOMelements.inputSeparator.value,
        DOMelements.caseSensitive.checked,
        DOMelements.searchElements.checked
      );
      return DOMelements.searchElements.checked
        ? [...DOMelements.textarea.value.matchAll(regex)].map((match) => match[0])
        : DOMelements.textarea.value.split(regex);
    } catch (error) {
      warnings.regexpError = DOMelements.inputSeparator.value;
      return false;
    }
  }
  function trim(str) {
    return str.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
  }
  function trimElements(lst) {
    return lst.map(trim);
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

    DOMelements.warningElement.hidden = Object.keys(warnings).length === 0;
    DOMelements.warningElement.innerHTML = Object.keys(warnings)
      .map((key) => warningMessages[key])
      .join("<br>");
  }
  function sortList(lst) {
    lst.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
    return DOMelements.reverse.checked
      ? lst.map((ele) => initialList[ele[1]]).reverse()
      : lst.map((ele) => initialList[ele[1]]);
  }
  function processNameOrder(textElements) {
    const sortingList = [];
    const warnings = { nameErrorsI: [] };
    let i = 0;
    textElements.forEach((ele) => {
      const inputtedWords = ele.split(" ").filter(Boolean);
      const [firstName, middleName, ...lastNameParts] = inputtedWords;

      if (inputtedWords.length < 1 || inputtedWords.length > 4) {
        warnings.nameErrorsI.push(i);
        return;
      }
      initialList.push(textElements[i]);
      const lastName = lastNameParts.join(" ");
      const formattedName = [lastName, firstName, middleName].filter(Boolean).join(" ");
      sortingList.push([formattedName, i]);
      i++;
    });

    return { sortingList, warnings };
  }
  let sortedList = [];
  let initialList = [];
  //
  let warnings = { nameErrorsI: [] };
  const textElements = getNames();
  if (textElements != false) {
    let sortingList = [];
    if (DOMelements.deleteSpaces.checked) {
      trimElements(textElements);
    }
    if (DOMelements.nameOrder.checked) {
      const { sortingList: newSortingList, warnings: newWarnings } = processNameOrder(textElements);
      sortingList = newSortingList;
      warnings = { ...warnings, ...newWarnings };
    } else {
      initialList = textElements;
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
