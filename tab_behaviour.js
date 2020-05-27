let input_data = editor.session.getValue(), gInput, gCode;
let code_data = "// we give you edges = [{source: 1, target: 2}]\n// N = num nodes;\nfunction main(edges, N) {\n\tlet vis = [], queue = [1], adj = [], order = [];\n\tfor (let i = 0; i <= N; i++) {\n\t\tvis.push(0);\n\t\tadj.push([]);\n\t}\n\tfor (let i = 0; i < edges.length; i++) {\n\t\tadj[edges[i].source.name].push(edges[i].target.name);\n\t\tadj[edges[i].target.name].push(edges[i].source.name);\n\t}\n\tvis[1] = 1;\n\twhile (queue.length) {\n\t\tlet curr = queue[0];\n\t\tqueue.shift();\n\t\torder.push(curr);\n\t\tfor (let i = 0; i < adj[curr].length; i++) {\n\t\t\tlet nxt = adj[curr][i];\n\t\t\tif (vis[nxt]) continue;\n\t\t\tvis[nxt] = 1;\n\t\t\tqueue.push(nxt);\n\t\t}\n\t}\n\treturn order;\n}";

// Otherwise, on first click for graph-input, it copies to graph-code
let clicked = true, curr_tab = true;

document.getElementById("graph-input").addEventListener("click", function() {
  gInput = document.getElementById("graph-input");
  gCode = document.getElementById("graph-code");
  gCode.classList.remove("active");
  gInput.classList.add("active");
  curr_tab = true;
  if (clicked) {
    clicked = false;
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
  curr_tab = false;
  if (!clicked) {
    clicked = true;
    input_data = editor.session.getValue();
  }
  editor.session.setValue(code_data);
  editor.getSession().setMode("ace/mode/javascript");
});
