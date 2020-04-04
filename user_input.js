

// we give you edges = [{source: 1, target: 2}]
// N = num nodes;
function main(edges, N) {
    let vis = [], queue = [1], adj = [], order = [];
    
    for (let i = 0; i <= N; i++) {
        vis.push(0);
        adj.push([]);
    }
    for (let i = 0; i < edges.length; i++) {
        adj[edges[i].source.name].push(edges[i].target.name);
    }

    vis[1] = 1;

    while (queue.length) {
        let curr = queue[0];
        queue.shift();
        order.push(curr);

        for (let i = 0; i < adj[curr].length; i++) {
            let nxt = adj[curr][i];
            if (vis[nxt]) continue;
            vis[nxt] = 1;
            queue.push(nxt);
        }
    }
    return order;
}
