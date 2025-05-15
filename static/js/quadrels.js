function getMaxDivinCommon(a, b) {
  return b === 0 ? a : getMaxDivinCommon(b, a % b);
}
function setCm() {
  //Accomodate measure selects
  selects.forEach((ele) => {
    measureCode.forEach((code, i) => {
      const opt = document.createElement("option");
      opt.value = code;
      opt.innerText = measureName[i];
      ele.appendChild(opt);
    });
  });
}

function getCm(value, type) {
  return value * measure2cm[getMeasure(type)];
}
function calculateDimensions(hRatio, vRatio, diag, width, height) {
  let method1, method2, a, newwidth, newHeight;

  if (hRatio != 0 && vRatio != 0) {
    method1 = "ratio";
    if (diag != 0) {
      method2 = "diagonal";
      a = Math.sqrt(diag ** 2 / (hRatio ** 2 + vRatio ** 2));
    } else if (width != 0) {
      method2 = "width";
      a = width / hRatio;
    } else if (height != 0) {
      method2 = "height";
      a = height / vRatio;
    }
    newwidth = a * hRatio;
    newHeight = a * vRatio;
  } else if (width != 0) {
    method1 = "width";
    newwidth = width;
    if (height != 0) {
      method2 = "height";
      newHeight = height;
      a = getMaxDivinCommon(width, height);
    } else if (diag != 0) {
      method2 = "diagonal";
      newHeight = Math.sqrt(diag ** 2 - width ** 2);
      a = getMaxDivinCommon(newHeight, width);
    }
  } else if (height !== 0) {
    method1 = "height";
    newHeight = height;
    if (diag !== 0) {
      method2 = "diagonal";
      newwidth = Math.sqrt(diag ** 2 - height ** 2);
      a = getMaxDivinCommon(newwidth, height);
    }
  }

  return { method1, method2, a, newwidth, newHeight };
}

function quadrels() {
  if (filledInputs < 2) {
    DOMelements.warning.hidden = false;
    DOMelements.result.hidden = true;
    console.warn("Not enough values to run");
    return;
  } else {
    DOMelements.warning.hidden = true;
    DOMelements.result.hidden = false;
  }

  const width = getCm(DOMelements.width.value, DOMelements.widthType.value);
  const height = getCm(DOMelements.height.value, DOMelements.heightType.value);
  const diag = getCm(DOMelements.diag.value, DOMelements.diagType.value);
  const hRatio = DOMelements.ratioh.value;
  const vRatio = DOMelements.ratiov.value;

  const { method1, method2, a, newwidth, newHeight } = calculateDimensions(
    hRatio,
    vRatio,
    diag,
    width,
    height
  );

  if (a) {
    const newVRatio = newHeight / a;
    const newHRatio = newwidth / a;
    newDiag = Math.sqrt((a * newHRatio) ** 2 + (a * newVRatio) ** 2);

    console.log("a:", a);
    DOMelements.resultMethod.innerText = `Using the the ${method1} and ${method2} inputs.`;
    DOMelements.resultRatio.innerText = `${newHRatio}:${newVRatio}`;

    const measureN = measureCode.indexOf(DOMelements.resultType.value);

    DOMelements.resultWidth.innerText = newwidth / measure2cm[measureN] + measureCode[measureN];
    DOMelements.resultHeight.innerText = newHeight / measure2cm[measureN] + measureCode[measureN];
    DOMelements.resultDiag.innerText = newDiag / measure2cm[measureN] + measureCode[measureN];
  }
}
const measureName = [
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
//fancy thing to add at the end of texts
const measureCode = ["cm", "AU", "ft", "fur", "in", "lea", "ly", "mi", "nmi", "pc", "rd", "yd"];
//how many centimeters fit in another measure
const measure2cm = [
  1, 14959787069100, 30.48, 20116.8, 2.54, 482803.2, 946073047258004200, 160934.4, 185200,
  3085677581279958500, 502.92, 91.44,
];
//elements
const DOMelements = {
  ratiov: document.getElementById("cmin.ratio.v"),
  ratioh: document.getElementById("cmin.ratio.h"),
  diag: document.getElementById("cmin.diag"),
  diagType: document.getElementById("cmin.diag.type"),
  height: document.getElementById("cmin.height"),
  heightType: document.getElementById("cmin.height.type"),
  width: document.getElementById("cmin.width"),
  widthType: document.getElementById("cmin.width.type"),
  result: document.getElementById("cmin.results"),
  warning: document.getElementById("cmin.warning"),
  resultMethod: document.getElementById("cmin.result.method"),
  resultRatio: document.getElementById("cmin.result.ratio"),
  resultHeight: document.getElementById("cmin.result.height"),
  resultWidth: document.getElementById("cmin.result.width"),
  resultDiag: document.getElementById("cmin.result.diag"),
  resultType: document.getElementById("cmin.result.type"),
};
const selects = [
  document.getElementById("cmin.width.type"),
  document.getElementById("cmin.height.type"),
  document.getElementById("cmin.diag.type"),
  document.getElementById("cmin.result.type"),
];
//const to check if the inputs are filled
const filledInputs = [
  DOMelements.ratiov.value && DOMelements.ratioh.value,
  DOMelements.diag.value,
  DOMelements.height.value,
  DOMelements.width.value,
].filter((v) => parseFloat(v)).length;
setCm();
quadrels();
