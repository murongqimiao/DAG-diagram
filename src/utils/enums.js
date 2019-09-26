const DAG_EVENTS = {
  MOVE_GRAPH: "move_graph",
  PRE_MOVE_NODE: "pre_move_node",
  MOVE_NODE: "move_node",
  DRAG_LINK: "drag_link"
};

const SIZE_CHANGE_TYPE = {
  INITIAL: "initial",
  EXPAND: "expand",
  SHRINK: "shrink"
};

const DAG_ELEMENT_TYPE = {
  NODE: "node",
  EDGE: "edge"
};

export { DAG_EVENTS, SIZE_CHANGE_TYPE, DAG_ELEMENT_TYPE };
