function orderNames() {
  function getNames() {
    const textarea = document.getElementById("sortNames.names").value;
    const inputSeparator = document.getElementById("sortNames.input").value;
    let inputSeparatorV = inputSeparator;
    if (!caseSensitive) {
      inputSeparatorV =
        inputSeparatorV.toLowerCase() + "|" + inputSeparatorV.toUpperCase();
    }
    const searchElements = document.getElementById(
      "sortNames.searchElements"
    ).checked;
    if (searchElements) {
      names = [...textarea.matchAll(inputSeparatorV)].map((match) => match[0]);
    } else {
      names = textarea.split(RegExp(inputSeparatorV));
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
    var result = orderedNameList.join(outputSeparator);
    result = result.replace(/\\n/g, "\n");
    if (result == "") {
      empty = true;
      resultElement.hidden = 1;
    } else {
      resultElement.innerHTML = result;
      empty = false;
      resultElement.hidden = 0;
    }
  }
  function printWarnings() {
    const warningElement = document.getElementById("sortNames.warning");
    if (empty) {
      warningElement.innerHTML = "Error. Empty result.";
      warningElement.hidden = 0;
    } else {
      a = errorsI.join(", ");
      warningElement.innerHTML =
        "Elements " +
        a +
        " have either too much or not enought arguments and are being ignored.";
      if (a == "") {
        warningElement.hidden = 1;
      } else {
        warningElement.hidden = 0;
      }
    }
  }
  function sortingList() {
    const reverse = document.getElementById("sortNames.reverse").checked;
    listToSort.sort().forEach((ele) => {
      let nameParts = ele.split(" ");
      var nameI = parseInt(nameParts[nameParts.length - 1], 10);
      if (reverse) {
        //var | let
        orderedNameList.unshift(initialNameList[nameI]);
      } else orderedNameList.push(initialNameList[nameI]);
      //toma | no toma
    });
  }
  let listToSort = [];
  let initialNameList = [];
  let orderedNameList = [];
  let names = [];
  let errorsI = [];
  const deleteSpaces = document.getElementById(
    "sortNames.deleteSpaces"
  ).checked;
  const nameOrder = document.getElementById("sortNames.nameOrder").checked;
  const caseSensitive = document.getElementById(
    "sortNames.caseSensitive"
  ).checked;
  let empty = false;
  getNames();
  if (deleteSpaces) {
    trimElements(names);
  }
  if (nameOrder) {
    let listI = 0;
    for (let i = 0; i < names.length; i++) {
      ele = names[i];
      let firstName = "",
        middleName = "",
        lastName = "";
      let inputted = ele.split(" ").filter(Boolean);
      firstName = inputted[0];
      if (inputted.length === 2) {
        lastName = inputted[1];
        listToSort.push(`${lastName} ${firstName} ${listI}`);
        initialNameList.push(`${firstName} ${lastName}`);
      } else if (inputted.length === 3) {
        middleName = inputted[1];
        lastName = inputted[2];
        listToSort.push(`${lastName} ${firstName} ${middleName} ${listI}`);
        initialNameList.push(`${firstName} ${middleName} ${lastName}`);
      } else if (inputted.length === 4) {
        middleName = inputted[1];
        lastName = `${inputted[2]} ${inputted[3]}`;
        listToSort.push(`${lastName} ${firstName} ${middleName} ${listI}`);
        initialNameList.push(`${firstName} ${middleName} ${lastName}`);
      } else {
        console.log("ENTRIES ERROR on i: " + i);
        errorsI.push(i);
        continue;
      }
      listI++;
    }
  } else {
    initialNameList = names;
    for (let i = 0; i < names.length; i++) {
      listToSort.push(names[i] + " " + i);
    }
  }
  if (!caseSensitive) {
    for (let i = 0; i < listToSort.length; i++) {
      listToSort[i] = listToSort[i].toUpperCase();
    }
  }
  sortingList();
  printResult();
  printWarnings();
}
orderNames();
