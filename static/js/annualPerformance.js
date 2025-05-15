function annualperf() {
  //Get annual performance of any investment
  const ci = DOMelements.initialCapital.value;
  const cf = DOMelements.finalCapital.value;
  const ti = DOMelements.daysInvested.value;
  if ((ci && cf && ti) != 0) {
    DOMelements.warning.hidden = 1;
    DOMelements.result.hidden = 0;
    DOMelements.result.innerText = ((cf - ci) / ci / ti) * 365 * 100 + "%";
  } else {
    DOMelements.warning.hidden = 0;
    DOMelements.result.hidden = 1;
  }
}

const DOMelements = {
  initialCapital: document.getElementById("anperf.initialCapital"),
  finalCapital: document.getElementById("anperf.finalCapital"),
  daysInvested: document.getElementById("anperf.daysInvested"),
  result: document.getElementById("anperf.result"),
  warning: document.getElementById("anperf.warning"),
};
annualperf();
