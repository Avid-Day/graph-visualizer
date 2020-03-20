// CONSTANTS
const SVG = d3.select("svg"),
    WIDTH = SVG.attr("width"),
    HEIGHT = SVG.attr("height");
    RADIUS = 20;

// GRAPH DATA
const graph = {
  nodes: [

  ],
  links: [

  ]
};

let N = raw_data[0],
    M = raw_data[2];

let newline = 0;
let templink = {};
for (let i = 4; i < editor.session.getLength() * 4 - 1; i++) {
  if (raw_data[i] === " " || raw_data[i] === "\n") continue;
  newline++;
  console.log(i, raw_data[i]);
  if (newline == 1) {
    templink.source = parseInt(raw_data[i]);
  } else {
    templink.target = parseInt(raw_data[i]);
    console.log(templink);
    graph.links.push(templink);
    templink = {};
    newline = 0;
  }
}

let tempnode = {};

for (let i = 1; i <= N; i++) {
  tempnode = {name: i};
  graph.nodes.push(tempnode);
}
/*
graph.nodes.push({name: "David"})
console.log(graph.nodes[8]);
*/

// GRAPH SIMULATION
let simulation = d3
  .forceSimulation(graph.nodes)
  .force(
    "link",
    d3
      .forceLink()
      .id(function(d) {
        return d.name;
      })
      .distance(150)
      .links(graph.links)
  )
  .force("charge", d3.forceManyBody().strength(-200))
  .force("center", d3.forceCenter(WIDTH / 2, HEIGHT / 2))
  .on("tick", ticked);

// EDGE AND NODE BEHAVIOUR/PROPERTIES
let link = SVG
  .append("g")
  .attr("class", "links")
  .selectAll("line")
  .data(graph.links)
  .enter()
  .append("line")
  .attr("stroke-WIDTH", function(d) {
    return 3;
  });

let node = SVG
  .append("g")
  .attr("class", "nodes")
  .selectAll("circle")
  .data(graph.nodes)
  .enter().append("g")
  .call(          // call here so we apply force to group 'g'. Otherwise a stutter will occur.
    d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended)
  );

  // Attach circle to group
  node.append("circle")
  .attr("r", RADIUS)
  .attr("fill", function(d) {
    return "white";
  });

  // attach text to group
  node.append("text")
      .attr("x", 0)
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.name; });

function restart() {
  graph.nodes = [];
  graph.links = [];
  let raw_data = editor.session.getValue();

  let N = raw_data[0],
      M = raw_data[2];

  let newline = 0;
  let templink = {};
  for (let i = 4; i < editor.session.getLength() * 4 - 1; i++) {
    if (raw_data[i] === " " || raw_data[i] === "\n") continue;
    newline++;
    console.log(i, raw_data[i]);
    if (newline == 1) {
      templink.source = parseInt(raw_data[i]);
    } else {
      templink.target = parseInt(raw_data[i]);
      console.log(templink);
      graph.links.push(templink);
      templink = {};
      newline = 0;
    }
  }

  let tempnode = {};

  for (let i = 1; i <= N; i++) {
    tempnode = {name: i};
    graph.nodes.push(tempnode);
  }
  // Apply the general update pattern to the nodes.
  node = node.data(graph.nodes);
  node.exit().remove();
  node = node.enter().append("circle").attr("fill", function(d) { return color(d.id); }).attr("r", 8).merge(node);

  // Apply the general update pattern to the links.
  link = link.data(graph.links);
  link.exit().remove();
  link = link.enter().append("line").merge(link);

  // Update and restart the simulation.
  simulation.nodes(graph.nodes);
  simulation.force("link").links(graph.links);
  simulation.alpha(1).restart();
}

document.getElementById("button").addEventListener("click", function() {
  restart();
});

function ticked() {
  link
    .attr("x1", function(d) {
      return d.source.x;
    })
    .attr("y1", function(d) {
      return d.source.y;
    })
    .attr("x2", function(d) {
      return d.target.x;
    })
    .attr("y2", function(d) {
      return d.target.y;
    });
    node
        .attr("transform", function(d) {
          return "translate(" + Math.max(RADIUS, Math.min(WIDTH - RADIUS, d.x)) + "," + Math.max(RADIUS, Math.min(HEIGHT - RADIUS, d.y)) + ")";
        })
}

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
