function parseRaw(data) {
  new_data = "";
  for (let i = 0; i < data.length; i++) {
    if (data[i] == '\n') {
      new_data += " ";
    } else {
      new_data += data[i];
    }
  }
  return new_data.split(" ");
}

let editor = ace.edit("editor");
editor.getSession().setMode("ace/mode/plain_text");
