function orderNames() {
  function getNames() {
    const textarea = document.getElementById("sortNames.names").value;
    const initialInputSeparator = document.getElementById("sortNames.input").value;
    let inputSeparator = document.getElementById("sortNames.input").value;
    /*if (!caseSensitive) {
      inputSeparator = inputSeparator.toLowerCase() + "|" + inputSeparator.toUpperCase();
    }*/
    const searchElements = document.getElementById("sortNames.searchElements").checked;
    try {
      if (searchElements) {
        return [...textarea.matchAll(inputSeparator)].map((match) => match[0]);
      } else {
        return textarea.split(RegExp(inputSeparator));
      }
    } catch (error) {
      console.error("Error recognizing regexp expression:", error);
      warnings.regexpError = initialInputSeparator;
      return false;
    }
  }
  function trim(str) {
    return str.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
  }
  function trimElements(lis) {
    for (let i = 0; i < lis.length; i++) {
      lis[i] = trim(lis[i]);
    }
  }
  function printResult() {
    const resultElement = document.getElementById("sortNames.result");
    const outputSeparator = document.getElementById("sortNames.output").value;
    const result = sortedList.join(outputSeparator).replace(/\\n/g, "\n");
    if (result != "") {
      resultElement.hidden = 0;
      resultElement.innerHTML = result;
    } else {
      warnings.empty = true;
      resultElement.hidden = 1;
    }
  }
  function printWarnings() {
    const warningElement = document.getElementById("sortNames.warning");
    if (warnings != {}) {
      warningElement.hidden = 0;
      warningElement.innerHTML = "";
      if (warnings.regexpError != undefined) {
        warningElement.innerHTML =
          'Unrecognized regular expression: "' + warnings.regexpError + '"';
      } else if (warnings.nameErrorsI != undefined && warnings.nameErrorsI != []) {
        warningElement.innerHTML =
          "Elements " +
          warnings.nameErrorsI.join(", ") +
          " have either too much or not enought arguments and are being ignored";
      } else if (warnings.empty == true) {
        warningElement.innerHTML = "Error. Empty result";
      }
    }
  }
  function sortList(lst) {
    const reverse = document.getElementById("sortNames.reverse").checked;
    //Here, I use the index I've placed in second element of each element (ele[1]) to look for the element in the initialList
    lst.sort((a, b) => {
      if (a[0] < b[0]) return -1;
      return 1;
    });
    lst.forEach((ele) => {
      reverse ? sortedList.unshift(initialList[ele[1]]) : sortedList.push(initialList[ele[1]]);
    });
  }
  let warnings = {};
  const textElements = getNames();
  var sortedList = [];
  let initialList = [];
  if (textElements != false) {
    let sortingList = [];
    const deleteSpaces = document.getElementById("sortNames.deleteSpaces").checked;
    const nameOrder = document.getElementById("sortNames.nameOrder").checked;
    const caseSensitive = document.getElementById("sortNames.caseSensitive").checked;
    if (deleteSpaces) {
      trimElements(textElements);
    }
    if (nameOrder) {
      warnings.nameErrorsI = [];
      //ListI is the index of the initialList that eill be searched for when sorting, as seen in sortingList()
      for (let i = 0, listI = 0; i < textElements.length; i++) {
        ele = textElements[i];
        let firstName = "",
          middleName = "",
          lastName = "";
        const inputtedWords = ele.split(" ").filter(Boolean);
        firstName = inputtedWords[0];
        if (inputtedWords.length === 1) {
        } else if (inputtedWords.length === 2) {
          lastName = inputtedWords[1];
          sortingList.push([`${lastName} ${firstName}`, listI]);
        } else if (inputtedWords.length === 3) {
          middleName = inputtedWords[1];
          lastName = inputtedWords[2];
          sortingList.push([`${lastName} ${firstName} ${middleName}`, listI]);
        } else if (inputtedWords.length === 4) {
          middleName = inputtedWords[1];
          lastName = `${inputtedWords[2]} ${inputtedWords[3]}`;
          sortingList.push([`${lastName} ${firstName} ${middleName}`, listI]);
        } else {
          console.log("ENTRIES ERROR on i: " + i);
          warnings.nameErrorsI.push(i);
          continue;
        }
        initialList.push(textElements[i]);
        listI++;
      }
    } else {
      initialList = textElements;
      for (let i = 0; i < textElements.length; i++) {
        sortingList.push([textElements[i], i]);
      }
    }
    console.log("initialList:");
    console.log(initialList);
    console.log("textelements:");
    console.log(textElements);
    if (!caseSensitive) {
      for (let i = 0; i < sortingList.length; i++) {
        sortingList[i][0] = sortingList[i][0].toUpperCase();
      }
    }
    sortList(sortingList);
  }

  printResult();
  printWarnings();
}
orderNames();
