let currentSSElements = [];
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
  "giphy/1.gif",
  "giphy/2.gif",
  "giphy/3.gif",
  "giphy/4.gif",
  "giphy/5.gif",
];
//set/update delay
var delay = document.getElementById("screensaver.delay").value;

function updateDelay() {
  delay = document.getElementById("screensaver.delay").value;
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
  }
}
function randomizeStyles() {
  //styles;
}
function updateScreensaver() {
  /*<FUNCTIONS*/
  function removeObjImgs() {
    for (let i = 0; i < currentSSElements.length; i++) {
      currentSSElements[i].remove();
    }
    currentSSElements = [];
  }
  function updateBg() {
    document.getElementById("gifbg").style.backgroundImage = "url(screensaver/" + bgImgs.random() + ")";;
  }
  function updateObjImgs() {
    var usedImgs = [-1];
    var imgUsed = -1;
    //shortest tab dimension
    var sSize =
      0.75 *
      (document.body.clientHeight > document.body.clientWidth
        ? document.body.clientHeight
        : document.body.clientWidth);
    const screenSaver = document.getElementById("screensaver");
    for (
      let i = 0;
      //Can't put more images than available + Next one's size acn't be less than 500px
      i < objImgs.length && sSize > 500;
      i++
    ) {
      const ele = document.createElement("img");
      ele.width = sSize;
      while (usedImgs.includes(imgUsed)) {
        imgUsed = objImgs.random();
      }
      usedImgs.push(imgUsed);
      ele.src = "screensaver/" + imgUsed;
      ele.draggable = 0;
      screenSaver.appendChild(ele);
      currentSSElements.push(ele);
      sSize *= 0.75;
    }
  }
  removeObjImgs();
  updateBg();
  updateObjImgs();
  screensaverTimeout();
}
updateScreensaver();
