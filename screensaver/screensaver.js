function updateDelay() {
  delay = document.getElementById("SS.delay").value;
  localStorage.setItem("SS.delay", delay);
  if ((waitUntilDelayIsNot0 = 1 && delay > 0)) {
    updateScreensaver();
    waitUntilDelayIsNot0 = 0;
  }
}
/*util*/
Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
  /*const randomIndex = Math.floor(Math.random() * this.length);
  return {
    ele: this[randomIndex],
    i: randomIndex,
  };*/
};
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
    //shortest tab dimension
    var sSize =
      document.body.clientHeight > document.body.clientWidth
        ? document.body.clientHeight
        : document.body.clientWidth;
    //longest tab dimension
    var lSize =
      document.body.clientHeight < document.body.clientWidth
        ? document.body.clientHeight
        : document.body.clientWidth;
    const screenSaver = document.getElementById("screensaver");
    var mode = { i: -1 };
    var imgCnt;
    /*var var1 = "int1 == 0";
      var int1 = 0;
      if (new Function("int1", `return ${var1};`)(int1)) {console.log("Condition is true!");}*/
    mode.i = getRandomInt(1, 1);
    if (mode.i == 0) {
      //Mode 0: imgs in the middle of the page, on top of each other
      //Next one's size can't be less than 500px
      mode.args = "i < imgCnt && sSize >= 500";
      sSize *= 0.75;
      imgCnt = objImgs.length;
      screenSaver.style.display = "grid";
      screenSaver.style.placeItems = "center";
    } else if (mode.i == 1) {
      //Mode 1: square # images (1, 4, 9, 16, ...) of fixed size on divisions of the page
      mode.args = "i < imgCnt";
      imgCnt = Math.floor(lSize / 300) ** 2;
      if (imgCnt > objImgs.length) {
        imgCnt = Math.floor(Math.sqrt(objImgs.length)) ** 2;
      }
      var imgDiv = document.createElement("div");
      imgDiv.id = "imgDiv";
      imgDiv.style.gridTemplateColumns = `repeat(${Math.sqrt(imgCnt)}, 1fr)`;
      imgDiv.style.gridTemplateRows = `repeat(${Math.sqrt(imgCnt)}, 1fr)`;
      screenSaver.appendChild(imgDiv);
      currentSSElements.push(imgDiv);
    }
    console.log(mode);
    let usedImgs = [null];
    let imgUsed = null;
    for (
      let i = 0;
      new Function("i", "imgCnt", "sSize", `return ${mode.args};`)(
        i,
        imgCnt,
        sSize
      );
      i++
    ) {
      const ele = document.createElement("img");
      while (usedImgs.includes(imgUsed)) {
        imgUsed = objImgs.random();
      }
      usedImgs.push(imgUsed);
      ele.src = "screensaver/" + imgUsed;
      ele.draggable = 0;
      ele.classList = "img" + i;
      currentSSElements.push(ele);
      if (mode.i == 0) {
        ele.width = sSize;
        screenSaver.appendChild(ele);
        sSize *= 0.75;
      } else if (mode.i == 1) {
        //1img:100%
        //4imgs:100%/sqrt(4)=50%
        //9imgs:100%/sqrt(9)=33.3%
        ele.width = (0.75 * sSize) / Math.sqrt(imgCnt);
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

document.getElementById("SS.delay").value =
  localStorage.getItem("SS.delay") >= 0
    ? localStorage.getItem("SS.delay")
    : 1000;

var waitUntilDelayIsNot0;
updateDelay();
updateScreensaver();
