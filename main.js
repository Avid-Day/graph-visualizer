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

let simulation, link, node;

function get_data() {
  new_data = parseRaw(editor.session.getValue());
  let N = parseInt(new_data[0]),
      M = parseInt(new_data[1]);
  let curr_ind = 2;
  for (let i = 0; i < M; i++) {
    let temp_link = {};
    temp_link.source = parseInt(new_data[curr_ind]);
    curr_ind++;
    temp_link.target = parseInt(new_data[curr_ind]);
    curr_ind++;

    graph.links.push(temp_link);
  }

  for (let i = 1; i <= N; i++) {
    let temp_node = {name: i};
    graph.nodes.push(temp_node);
  }
}

function create_graph() {
  SVG.selectAll("*").remove();
  graph.nodes = [];
  graph.links = [];
  get_data();

  // GRAPH SIMULATION
  simulation = d3
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
    .force("charge", d3.forceManyBody().strength(-250))
    .force("center", d3.forceCenter(WIDTH / 2, HEIGHT / 2))
    .on("tick", ticked);

  // EDGE AND NODE BEHAVIOUR/PROPERTIES
  link = SVG
    .append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter()
    .append("line")
    .attr("stroke-WIDTH", function(d) {
      return 3;
    });

  node = SVG
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
}

create_graph();

document.getElementById("button").addEventListener("click", function() {
  create_graph();
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
