import dagre from 'dagre';

function getNodesPosition(nodes_info, edges_info) {
  let g = new dagre.graphlib.Graph();
  g.setGraph({
    rankDir: "LR",
    align: "DR"
  });
  // Default to assigning a new object as a label for each new edge, if edge not set label, layout will throw exception
  g.setDefaultEdgeLabel(function() { return {}; });
  nodes_info.forEach(node_info => {
    g.setNode(node_info.id, {
      width: node_info.width,
      height: node_info.height
    });
  });
  edges_info.forEach(edge_info => {
    g.setEdge(edge_info.from, edge_info.to);
  });
  dagre.layout(g);

  let res = {};
  g.nodes().forEach(v => {
    res[v] = {
      x: g.node(v).x,
      y: g.node(v).y
    }
  });
  return res;
}

export { getNodesPosition }
