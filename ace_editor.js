let editor = ace.edit("editor");
editor.getSession().setMode("ace/mode/plain_text");

let raw_data = editor.session.getValue();
