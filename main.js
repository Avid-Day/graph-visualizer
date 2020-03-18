// how to deal with self loops?
let test_node = new Node(1, [], 50, 50);
let test_node2 = new Node(2, [], 100, 100);
test_node.node_adj = [test_node2];

test_node.draw_edge();
test_node.draw_node();
test_node2.draw_node();
