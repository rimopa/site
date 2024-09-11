function annualperf() {
  //Get annual performance of any investment
  ci = document.getElementById("anperf.initialCapital").value;
  cf = document.getElementById("anperf.finalCapital").value;
  ti = document.getElementById("anperf.daysInvested").value;
  if ((ci && cf && ti) != "") {
    document.getElementById("anperf.warning").hidden = 1;
    document.getElementById("anperf.result").hidden = 0;
    document.getElementById("anperf.result").innerText =
      ((cf - ci) / ci / ti) * 365 * 100 + "%";
  } else {
    document.getElementById("anperf.warning").hidden = 0;
    document.getElementById("anperf.result").hidden = 1;
  }
}
function distance2points() {
  //Get different kinds of distance between two points on a plane
  p = document.getElementById("d2p.p").value;
  x1 = document.getElementById("d2p.x1").value;
  y1 = document.getElementById("d2p.y1").value;
  x2 = document.getElementById("d2p.x2").value;
  y2 = document.getElementById("d2p.y2").value;
  if ((p && x1 && y1 && x2 && y2) != "") {
    document.getElementById("d2p.warning").hidden = 1;
    document.getElementById("d2p.result").hidden = 0;
    document.getElementById("d2p.result").innerText =
      (Math.abs(x2 - x1) ** p + Math.abs(y2 - y1) ** p) ** (1 / p);
    document.getElementById("d2p.result").title =
      document.getElementById("d2p.result").innerText + " mandarinas";
  } else {
    document.getElementById("d2p.warning").hidden = 0;
    document.getElementById("d2p.result").hidden = 1;
  }
}
function quadrilateralRelations() {
  if (
    (document.getElementById("cmin.ratio.v").value != 0 &&
      document.getElementById("cmin.ratio.h").value != 0) +
      (document.getElementById("cmin.diag").value != 0) +
      (document.getElementById("cmin.height").value != 0) +
      (document.getElementById("cmin.width").value != 0) <
    2
  ) {
    document.getElementById("cmin.warning").hidden = 0;
    document.getElementById("cmin.results").hidden = 1;
    console.log("Not enough values to run");
    return;
  } else {
    document.getElementById("cmin.warning").hidden = 1;
    document.getElementById("cmin.results").hidden = 0;
  }
  //check if it's possible
  width = getCm(
    document.getElementById("cmin.width").value,
    document.getElementById("cmin.width.type").value
  );
  height = getCm(
    document.getElementById("cmin.height").value,
    document.getElementById("cmin.height.type").value
  );
  diag = getCm(
    document.getElementById("cmin.diag").value,
    document.getElementById("cmin.diag.type").value
  );
  hRatio = +document.getElementById("cmin.ratio.h").value;
  vRatio = +document.getElementById("cmin.ratio.v").value;
  newHRatio = 0;
  newVRatio = 0;
  newHeight = 0;
  newwidth = 0;
  newDiag = 0;
  a = 0;
  //a=the value that, multiplicated by the ratio, gives the height and width
  method1 = "patata";
  method2 = "mandarina";
  if (hRatio != 0 && vRatio != 0) {
    method1 = "ratio";
    newHRatio = hRatio;
    newVRatio = vRatio;
    if (diag != 0) {
      method2 = "diagonal";
      a = Math.sqrt(diag ** 2 / (hRatio ** 2 + vRatio ** 2));
    } else {
      if (width != 0) {
        method2 = "width";
        a = width / hRatio;
      } else {
        if (height != 0) {
          method2 = "height";
          a = height / vRatio;
        }
      }
    }
    newwidth = a * newHRatio;
    newHeight = a * newVRatio;
  } else {
    if (width != 0) {
      newwidth = width;
      method1 = "width";
      if (height != 0) {
        method2 = "height";
        newHeight = height;
        a = getMaxDivinCommon(width, height);
      } else {
        if (diag !== 0) {
          method2 = "diagonal";
          a = getMaxDivinCommon(
            (newHeight = Math.sqrt(diag ** 2 - width ** 2)),
            width
          );
        }
      }
    } else {
      if (height != 0) {
        method1 = "height";
        newHeight = height;
        if (diag != 0) {
          method2 = "diagonal";
          a = getMaxDivinCommon(
            (newwidth = Math.sqrt(diag ** 2 - height ** 2)),
            height
          );
        }
      }
    }
    newVRatio = newHeight / a;
    newHRatio = newwidth / a;
  }
  /*
  cmin.result.method
  cmin.result.ratio
  cmin.result.width
  cmin.result.height
  cmin.result.diag
  */
  newDiag = Math.sqrt((a * newHRatio) ** 2 + (a * newVRatio) ** 2);
  console.log("a:", a);
  document.getElementById("cmin.result.method").innerText =
    "Using the the " + method1 + " and  " + method2 + " inputs.";
  document.getElementById("cmin.result.ratio").innerText =
    newHRatio + ":" + newVRatio;

  measureN = getMeasure(document.getElementById("cmin.result.type").value);

  document.getElementById("cmin.result.width").innerText =
    newwidth / measure2cm[measureN] + measureCode[measureN];
  document.getElementById("cmin.result.height").innerText =
    newHeight / measure2cm[measureN] + measureCode[measureN];
  document.getElementById("cmin.result.diag").innerText =
    newDiag / measure2cm[measureN] + measureCode[measureN];
}
function setCm() {
  measureName = [
    "Centimeters",
    "Astronomical units",
    "Feet",
    "Furlongs",
    "Inches",
    "League",
    "Light years",
    "Miles",
    "Nautical Miles",
    "Parsec",
    "Rods",
    "Yards",
  ];
  measureCode = [
    "cm",
    "AU",
    "ft",
    "fur",
    "in",
    "lea",
    "ly",
    "mi",
    "nmi",
    "pc",
    "rd",
    "yd",
  ];
  measure2cm = [
    1, 14959787069100, 30.48, 20116.8, 2.54, 482803.2, 946073047258004200,
    160934.4, 185200, 3085677581279958500, 502.92, 91.44,
  ];
  //how many centimeters fit in the other measure
  selects = [
    document.getElementById("cmin.width.type"),
    document.getElementById("cmin.height.type"),
    document.getElementById("cmin.diag.type"),
    document.getElementById("cmin.result.type"),
  ];
  //Accomodate measure selects
  for (let i = 0; i < selects.length; i++) {
    for (let i2 = 0; i2 < measureCode.length; i2++) {
      const ele = document.createElement("option");
      ele.value = measureCode[i2];
      ele.innerText = measureName[i2];
      selects[i].appendChild(ele);
    }
  }
}
function getMaxDivinCommon(a, b) {
  if (b === 0) {
    return a;
  }
  return getMaxDivinCommon(b, a % b);
}
function getMeasure(type) {
  for (let index = 0; index < measureCode.length; index++) {
    if (type == measureCode[index]) {
      return index;
    }
  }
}
function getCm(value, type) {
  measureN = getMeasure(type);
  return value * measure2cm[measureN];
}
distance2points();
annualperf();
setCm();
quadrilateralRelations();
//initial execution
