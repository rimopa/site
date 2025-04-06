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
annualperf();
