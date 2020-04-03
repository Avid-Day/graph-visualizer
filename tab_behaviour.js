let input_data = editor.session.getValue(),
    code_data = "", gInput, gCode;

// Otherwise, on first click for graph-input, it copies to graph-code
let haveNotClicked = true;

document.getElementById("graph-input").addEventListener("click", function() {
  gInput = document.getElementById("graph-input");
  gCode = document.getElementById("graph-code");
  gCode.classList.remove("active");
  gInput.classList.add("active");
  if (!haveNotClicked) {
    code_data = editor.session.getValue();
  }
  editor.getSession().setMode("ace/mode/plain_text");
  editor.session.setValue(input_data);
});

document.getElementById("graph-code").addEventListener("click", function() {
  gInput = document.getElementById("graph-input");
  gCode = document.getElementById("graph-code");
  gInput.classList.remove("active");
  gCode.classList.add("active");
  haveNotClicked = false;
  input_data = editor.session.getValue();
  editor.session.setValue(code_data);
  editor.getSession().setMode("ace/mode/javascript");
});
