document.getElementById("graph-input").addEventListener("click", function() {
  let gInput = document.getElementById("graph-input"),
      gCode = document.getElementById("graph-code");
  gCode.classList.remove("active");
  gInput.classList.add("active");
});

document.getElementById("graph-code").addEventListener("click", function() {
  let gInput = document.getElementById("graph-input"),
      gCode = document.getElementById("graph-code");
  gInput.classList.remove("active");
  gCode.classList.add("active");
});
