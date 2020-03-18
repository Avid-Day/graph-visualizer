class Node {
  constructor(id, adj, x, y) {
    this.id = id;
    this.adj = adj;
    this.x = x;
    this.y = y;
  }

  get node_id() {
    return this.id;
  }

  get node_adj() {
    return this.adj;
  }

  get x_pos() {
    return this.x;
  }

  get y_pos() {
    return this.y;
  }

  set node_id(id) {
    this.id = id;
  }

  set node_adj(adj) {
    this.adj = adj;
  }

  set x_pos(x) {
    this.x = x;
  }

  set y_pos(y) {
    this.y = y;
  }

  draw_node() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 15, 0, Math.PI * 2, true);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.fillStyle = "#000000";
    ctx.fillText(this.id, this.x - 6, this.y + 6);
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  draw_edge() {
    for (let i = 0; i < this.adj.length; i++) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.adj[i].x_pos, this.adj[i].y_pos);
      //ctx.lineTo(i.x_pos, i.y_pos);
      ctx.stroke();
    }
  }
}
