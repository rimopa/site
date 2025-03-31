/*util*/
Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
  /*const randomIndex = Math.floor(Math.random() * this.length);
  return {
    ele: this[randomIndex],
    i: randomIndex,
  };*/
};
Array.prototype.removeVal = function (value) {
  var idx = this.indexOf(value);
  if (idx > -1) {
    this.splice(idx, 1);
  }
  return this;
};
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function updateDelay() {
  delay = document.getElementById("SS.delay").value;
  localStorage.setItem("SS.delay", delay);
  if ((waitUntilDelayIsNot0 = 1 && delay > 0)) {
    updateScreensaver();
    waitUntilDelayIsNot0 = 0;
  }
}
function screensaverTimeout() {
  if (delay > 0) {
    setTimeout(() => {
      updateScreensaver();
    }, delay);
  } else {
    waitUntilDelayIsNot0 = 1;
  }
}
function updateScreensaver() {
  function removeObjImgs() {
    for (let i = 0; i < currentSSElements.length; i++) {
      currentSSElements[i].remove();
    }
    currentSSElements = [];
  }
  function updateBg() {
    bg.style.backgroundImage = "url(screensaver/" + bgImgs.random() + ")";
    if (getRandomInt(0, 1) == 0) {
      bg.style.backgroundSize = "cover";
    } else {
      bg.style.backgroundSize = "auto";
    }
  }
  function updateObjImgs() {
    const ttObjImgs = objImgs.length;
    var cWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    var cHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    //shortest tab dimension
    var sSize = Math.min(cHeight, cWidth);
    //longest tab dimension
    //var lSize = Math.max(cHeight, cWidth);
    const screenSaver = document.getElementById("screensaver");
    var imgCnt;
    var mode = { i: getRandomInt(1, 1) };
    if (mode.i == 0) {
      //Mode 0: imgs in the middle of the page, on top of each other
      //Next one's size can't be less than 500px
      mode.args = "i < imgCnt && sSize >= 500";
      imgCnt = ttObjImgs;
      screenSaver.style.display = "grid";
      screenSaver.style.placeItems = "center";
    } else if (mode.i == 1) {
      //Mode 1: images  of fixed size on page grid
      mode.args = "i < imgCnt";
      var columns = Math.floor(cWidth / 300);
      var rows = Math.floor(cHeight / 300);
      console.log(columns, rows);
      console.log(cHeight, cWidth);
      //Prevent imgCnt being larger than ttObjImgs
      while (columns * rows > ttObjImgs) {
        if (cHeight > cWidth && columns > 1) {
          columns--;
        } else if (rows > 1) {
          rows--;
        } else {
          break;
        }
      }
      while (
        (columns * (rows + 1) <= ttObjImgs && (rows + 1) * 300 <= cHeight) ||
        ((columns + 1) * rows <= ttObjImgs && (columns + 1) * 300 <= cWidth)
      ) {
        console.log("try doing this");
        if (columns * (rows + 1) <= ttObjImgs) {
          console.log("plus row");
          rows++;
        } else {
          console.log("plus columns");
          columns++;
        }
      }
      imgCnt = columns * rows;

      var imgDiv = document.createElement("div");
      imgDiv.id = "imgDiv";
      imgDiv.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
      imgDiv.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
      screenSaver.appendChild(imgDiv);
      currentSSElements.push(imgDiv);
    }
    /*var var1 = "int1 == 0";
      var int1 = 0;
      if (new Function("int1", `return ${var1};`)(int1)) {console.log("Condition is true!");}*/
    for (
      let i = 0, unUsedImgs = objImgs.slice();
      new Function("i", "imgCnt", "sSize", `return ${mode.args};`)(
        i,
        imgCnt,
        sSize
      );
      i++
    ) {
      let imgUsed = unUsedImgs.random();
      unUsedImgs = unUsedImgs.removeVal(imgUsed);
      const ele = document.createElement("img");
      ele.src = "screensaver/" + imgUsed;
      ele.draggable = 0;
      ele.classList = "img" + i;
      currentSSElements.push(ele);
      if (mode.i == 0) {
        sSize *= 0.75;
        ele.width = sSize;
        screenSaver.appendChild(ele);
      } else if (mode.i == 1) {
        imgDiv.appendChild(ele);
      }
    }
  }
  removeObjImgs();
  updateBg();
  updateObjImgs();
  screensaverTimeout();
}
let currentSSElements = [];
const bg = document.getElementById("gifbg");
//object images
let objImgs = [
  "pixabay/ball.gif",
  "pixabay/bicycle.gif",
  "pixabay/box.gif",
  "pixabay/hamster.gif",
  "pixabay/procrastinate.gif",
  "pixabay/wheel.gif",
];
//background images
let bgImgs = [
  "okkult/1.gif",
  "okkult/2.gif",
  "okkult/3-1.gif",
  "okkult/3-2.gif",
  "okkult/3-3.gif",
  "okkult/4.webp",
];
//set/update delay + localStorage
var delay = (document.getElementById("SS.delay").value =
  localStorage.getItem("SS.delay") >= 0
    ? localStorage.getItem("SS.delay")
    : 1000);

var waitUntilDelayIsNot0;
updateDelay();
updateScreensaver();
