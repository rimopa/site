function orderNames() {
  function trim(str) {
    return str.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
  }
  let listToSort = [];
  let initialNameList = [];
  let orderedNameList = [];
  let result = "";
  let outputFormat = document.getElementById("sortNames.output").value;
  let inputFormat = document.getElementById("sortNames.input").value;
  let reverse = document.getElementById("sortNames.reverse").checked;
  let resultElement = document.getElementById("sortNames.result");
  var textarea = document.getElementById("sortNames.names").value;
  let names = textarea.split(inputFormat === "line" ? "\n" : ",");
  for (let i = 0; i < names.length; i++) {
    names[i] = trim(names[i]);
  }
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
      continue;
    }
    listI++;
  }
  function sortAndPrint() {
    listToSort.sort().forEach((ele) => {
      let nameParts = ele.split(" ");
      let nameI = parseInt(nameParts[nameParts.length - 1], 10);
      if (reverse) {
        orderedNameList.unshift(initialNameList[nameI]);
      } else orderedNameList.push(initialNameList[nameI]);
    });
    orderedNameList.forEach((ele) => {
      if (result === "") {
        result = ele;
      } else {
        result = result + (outputFormat === "line" ? "\n" : ", ") + ele;
      }
    });
    resultElement.innerHTML = result;
    console.log(result);
  }
  sortAndPrint();
}
orderNames();
