(() => {
  /*util*/
  Array.prototype.random = function () {
    return this[(Math.random() * this.length) | 0];
  };
  function getRandomInt(min = 0, max = 1) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function screensaverTimeout() {
    clearTimeout(screensaverTimer);
    const delay = Number(delayElement.value);
    localStorage.setItem("SS.delay", delay);
    if (delay > 0) {
      screensaverTimer = setTimeout(() => {
        requestAnimationFrame(() => updateScreensaver());
      }, delay);
    }
  }
  function calculateDimensions() {
    cWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    cHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    //shortest tab dimension
    sSize = Math.min(cHeight, cWidth);
    //longest tab dimension
    lSize = Math.max(cHeight, cWidth);
  }
  window.addEventListener("resize", calculateDimensions);
  function preloadImages(images) {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }
  function updateScreensaver() {
    function removeObjImgs() {
      for (let i = 0; i < currentSSElements.length; i++) {
        currentSSElements[i].remove();
      }
      currentSSElements = [];
    }
    function updateBg() {
      bg.style.backgroundImage = "url(" + bgImgs.random() + ")";
      bg.classList.toggle("cover-bg", getRandomInt(0, 1) === 0);
    }
    function updateObjImgs() {
      removeObjImgs();
      let imgCnt;
      const mode = getRandomInt(0, 1);
      if (mode === 0) {
        //Mode 0: imgs in the middle of the page, on top of each other
        //Next one's size can't be less than min_img_size
        imgCnt = ttObjImgs;
        screenSaver.style.display = "grid";
        screenSaver.style.placeItems = "center";
      } else if (mode === 1) {
        //Mode 1: images  of fixed size on page grid
        //columns/rows count for long side (lCnt) or short side (sCnt). Simplifies code.
        let lCnt = Math.floor(lSize / grid_cell_size);
        let sCnt = Math.floor(sSize / grid_cell_size);
        //Prevent imgCnt being larger than ttObjImgs
        console.log("initial: long:" + lCnt + " short:" + sCnt);
        while (lCnt * sCnt > ttObjImgs) {
          if (sCnt > 1) {
            console.log("short--");
            sCnt--;
          } else if (lCnt > 1) {
            console.log("long--");
            lCnt--;
          } else {
            break;
          }
        }
        while (
          sCnt + 2 <= lCnt &&
          (sCnt + 1) * (lCnt - 1) >= lCnt * sCnt &&
          (sCnt + 1) * (lCnt - 1) <= ttObjImgs &&
          (sCnt + 1) * grid_cell_size <= sSize
        ) {
          console.log("long-- short++");
          lCnt--;
          sCnt++;
        }
        console.log("final: long:" + lCnt + " short:" + sCnt);
        let columns, rows;
        if (cHeight > cWidth) {
          columns = sCnt;
          rows = lCnt;
        } else {
          columns = lCnt;
          rows = sCnt;
        }
        imgCnt = columns * rows;
        console.log("imgCnt:" + imgCnt + " c:" + columns + " r:" + rows);

        const imgDiv = document.createElement("div");
        imgDiv.id = "imgDiv";
        imgDiv.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        imgDiv.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        screenSaver.appendChild(imgDiv);
        currentSSElements.push(imgDiv);
      }
      const fragment = document.createDocumentFragment();
      for (
        let i = 0, unUsedImgs = objImgs.slice(), size = sSize;
        i < imgCnt && (mode !== 0 || sSize >= min_img_size);
        i++
      ) {
        const ele = document.createElement("img");
        ele.src = unUsedImgs.splice(
          getRandomInt(0, unUsedImgs.length - 1),
          1,
        )[0];
        ele.draggable = 0;
        ele.classList = `img${i}`;
        currentSSElements.push(ele);
        if (mode === 0) {
          size *= size_reduction_fator;
          ele.width = size;
        }
        fragment.appendChild(ele);
      }
      if (mode === 0) {
        screenSaver.appendChild(fragment);
      } else if (mode === 1) {
        imgDiv.appendChild(fragment);
      }
    }
    updateBg();
    updateObjImgs();
    screensaverTimeout();
  }
  //Images
  const objImgs = [
    "../imgs/pixabay/ball.gif",
    "../imgs/pixabay/bicycle.gif",
    "../imgs/pixabay/box.gif",
    "../imgs/pixabay/hamster.gif",
    "../imgs/pixabay/procrastinate.gif",
    "../imgs/pixabay/wheel.gif",
    "../imgs/pixabay/dna.gif",
    "../imgs/pixabay/download.gif",
    "../imgs/pixabay/generation.gif",
    "../imgs/pixabay/sphere.gif",
    "../imgs/pixabay/steampunk.gif",
  ];
  const bgImgs = [
    "../imgs/okkult/1.gif",
    "../imgs/okkult/2.gif",
    "../imgs/okkult/3-1.gif",
    "../imgs/okkult/3-2.gif",
    "../imgs/okkult/3-3.gif",
    "../imgs/okkult/4.webp",
  ];
  preloadImages([...objImgs, ...bgImgs]);

  //Numbers
  const min_img_size = 500; //minimum size of the image in mode 0
  const size_reduction_fator = 0.75; //size reduction factor for mode 0
  const grid_cell_size = 300; //size of the grid cell in mode 1
  const ttObjImgs = objImgs.length;
  let cWidth, cHeight, sSize, lSize;
  let screensaverTimer;
  //Elements
  let currentSSElements = [];
  const screenSaver = document.getElementById("screensaver");
  const bg = document.getElementById("gifbg");
  const delayElement = document.getElementById("SS.delay");
  //set/update delay + localStorage
  document.getElementById("SS.delay").value =
    localStorage.getItem("SS.delay") > 0
      ? localStorage.getItem("SS.delay")
      : 1000;
  //initial execution
  calculateDimensions();
  updateScreensaver();
})();
