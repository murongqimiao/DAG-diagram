export const simple_example_data = {
  edges: [
    {
      dst_input_idx: 0,
      dst_node_id: 2,
      id: 1,
      src_node_id: 1,
      src_output_idx: 0,
      edgesText: 'running into subnode'
    }
  ],
  nodes: [
    {
      id: 1,
      in_ports: [0],
      name: 'NODE_PARENT',
      out_ports: [0],
      pos_x: 157,
      pos_y: 120,
      type: 'Variable',
      iconClassName: 'el-icon-link',
      detail: [
        {
          label: 'time',
          value: '2018'
        }
      ]
    },
    {
      id: 2,
      in_ports: [0],
      name: 'NODE_CHILD',
      iconClassName: 'el-icon-cpu',
      out_ports: [0],
      pos_x: 459,
      pos_y: 457,
      type: 'Variable'
    }
  ]
}

export const simple_r_click_data = {
  edges: [
    {
      dst_input_idx: 0,
      dst_node_id: 2,
      id: 1,
      src_node_id: 1,
      src_output_idx: 0
    }
  ],
  nodes: [
    {
      id: 1,
      in_ports: [0],
      name: 'NODE_PARENT',
      out_ports: [0],
      pos_x: 157,
      pos_y: 120,
      type: 'Variable',
      iconClassName: 'el-icon-link',
      rightClickEvent: [
        {
          label: 'do some thing1',
          eventName: 'eventOfDoSomeThingFirst'
        },
        {
          label: 'do some thing2',
          eventName: 'evnetOfDoSomeThingSecond'
        }
      ],
      detail: [
        {
          label: 'time',
          value: '2018'
        }
      ]
    },
    {
      id: 2,
      in_ports: [0],
      name: 'NODE_CHILD',
      iconClassName: 'el-icon-cpu',
      out_ports: [0],
      pos_x: 459,
      pos_y: 257,
      rightClickEvent: [
        {
          label: 'do some thing3',
          eventName: 'eventOfDoSomeThingThird'
        },
        {
          label: 'do some thing4',
          eventName: 'evnetOfDoSomeThing4'
        }
      ],
      type: 'Variable'
    }
  ]
}

export const edges_example_data = {
  rectEdges: [
    {
      dst_input_idx: 0,
      dst_node_id: 2,
      id: 1,
      src_node_id: 1,
      src_output_idx: 0,
      style: {
        'stroke-width': '4px',
        stroke: 'red',
        animation: 'none',
        'stroke-dasharray': '0px'
      }
    }
  ],
  nodes: [
    {
      id: 1,
      in_ports: [0],
      name: 'NODE_PARENT',
      out_ports: [0],
      pos_x: 157,
      pos_y: 120,
      type: 'Variable'
    },
    {
      id: 2,
      in_ports: [0],
      name: 'NODE_CHILD',
      out_ports: [0],
      pos_x: 459,
      pos_y: 247,
      type: 'Variable'
    }
  ]
}

export const nodes_example_data = {
  edges: [
    {
      dst_input_idx: 0,
      dst_node_id: 2,
      id: 1,
      src_node_id: 1,
      src_output_idx: 0,
      type: 'active'
    }
  ],
  nodes: [
    {
      id: 1,
      in_ports: [0],
      name: 'NODE_PARENT',
      out_ports: [0],
      pos_x: 157,
      pos_y: 120,
      type: 'Variable',
      nodeStyle: { border: '2px solid orange' },
      iconStyle: { background: 'orange' }
    },
    {
      id: 2,
      in_ports: [0],
      name: 'NODE_CHILD',
      out_ports: [0],
      pos_x: 459,
      pos_y: 257,
      type: 'Variable',
      nodeStyle: { border: '2px solid greenYellow' },
      iconStyle: { background: 'red' }
    }
  ]
}

export const text_example_data = {
  edges: [
    {
      dst_input_idx: 0,
      dst_node_id: 2,
      id: 1,
      src_node_id: 1,
      src_output_idx: 3,
      edgesText: 'example text'
    },
    {
      dst_input_idx: 1,
      dst_node_id: 3,
      id: 2,
      src_node_id: 1,
      src_output_idx: 1,
      edgesText: 'personal style',
      textStyle: {
        fontSize: '12px',
        stroke: 'yellow'
      }
    },
    {
      dst_input_idx: 2,
      dst_node_id: 3,
      id: 3,
      src_node_id: 1,
      src_output_idx: 2
    }
  ],
  nodes: [
    {
      id: 1,
      in_ports: [0, 1, 2],
      name: 'NODE_PARENT',
      out_ports: [0, 1, 2, 3],
      pos_x: 157,
      pos_y: 120
    },
    {
      id: 2,
      in_ports: [0, 1, 2],
      name: 'NODE_CHILD',
      out_ports: [0, 1],
      pos_x: 459,
      pos_y: 257
    },
    {
      id: 3,
      in_ports: [0, 1, 2, 3, 4],
      name: 'NODE_CHILD',
      out_ports: [0, 1, 2, 3],
      pos_x: 50,
      pos_y: 400
    }
  ]
}

export const ports_example_data = {
  edges: [
    {
      dst_input_idx: 0,
      dst_node_id: 2,
      id: 1,
      src_node_id: 1,
      src_output_idx: 3
    },
    {
      dst_input_idx: 1,
      dst_node_id: 3,
      id: 2,
      src_node_id: 1,
      src_output_idx: 1
    },
    {
      dst_input_idx: 2,
      dst_node_id: 3,
      id: 3,
      src_node_id: 1,
      src_output_idx: 2
    }
  ],
  nodes: [
    {
      id: 1,
      in_ports: [0, 1, 2],
      name: 'NODE_PARENT',
      out_ports: [0, 1, 2, 3],
      pos_x: 157,
      pos_y: 120
    },
    {
      id: 2,
      in_ports: [0, 1, 2],
      name: 'NODE_CHILD',
      out_ports: [0, 1],
      pos_x: 459,
      pos_y: 257
    },
    {
      id: 3,
      in_ports: [0, 1, 2, 3, 4],
      name: 'NODE_CHILD',
      out_ports: [0, 1, 2, 3],
      pos_x: 50,
      pos_y: 400
    }
  ]
}

export const complex_example_data = {
  edges: [
    {
      dst_input_idx: 0,
      dst_node_id: 1,
      id: 2,
      src_node_id: 0,
      src_output_idx: 0,
      type: 'active'
    },
    {
      dst_input_idx: 0,
      dst_node_id: 4,
      id: 5,
      src_node_id: 3,
      src_output_idx: 0,
      type: 'active'
    },
    {
      dst_input_idx: 0,
      dst_node_id: 7,
      id: 8,
      src_node_id: 6,
      src_output_idx: 0,
      type: 'active'
    },
    {
      dst_input_idx: 0,
      dst_node_id: 12,
      id: 15,
      src_node_id: 9,
      src_output_idx: 0,
      type: 'active'
    },
    {
      dst_input_idx: 1,
      dst_node_id: 12,
      id: 16,
      src_node_id: 1,
      src_output_idx: 0,
      type: 'active'
    },
    {
      dst_input_idx: 0,
      dst_node_id: 13,
      id: 17,
      src_node_id: 10,
      src_output_idx: 0,
      type: 'active'
    },
    {
      dst_input_idx: 1,
      dst_node_id: 13,
      id: 18,
      src_node_id: 4,
      src_output_idx: 0
    },
    {
      dst_input_idx: 0,
      dst_node_id: 14,
      id: 19,
      src_node_id: 11,
      src_output_idx: 0
    },
    {
      dst_input_idx: 1,
      dst_node_id: 14,
      id: 20,
      src_node_id: 7,
      src_output_idx: 0
    },
    {
      dst_input_idx: 0,
      dst_node_id: 21,
      id: 23,
      src_node_id: 12,
      src_output_idx: 0
    },
    {
      dst_input_idx: 1,
      dst_node_id: 21,
      id: 24,
      src_node_id: 13,
      src_output_idx: 0
    },
    {
      dst_input_idx: 2,
      dst_node_id: 21,
      id: 25,
      src_node_id: 14,
      src_output_idx: 0
    },
    {
      dst_input_idx: 0,
      dst_node_id: 22,
      id: 26,
      src_node_id: 21,
      src_output_idx: 0
    },
    {
      dst_input_idx: 0,
      dst_node_id: 28,
      id: 29,
      src_node_id: 27,
      src_output_idx: 0
    },
    {
      dst_input_idx: 0,
      dst_node_id: 31,
      id: 32,
      src_node_id: 30,
      src_output_idx: 0
    },
    {
      dst_input_idx: 0,
      dst_node_id: 34,
      id: 35,
      src_node_id: 33,
      src_output_idx: 0
    },
    {
      dst_input_idx: 0,
      dst_node_id: 37,
      id: 38,
      src_node_id: 36,
      src_output_idx: 0
    },
    {
      dst_input_idx: 0,
      dst_node_id: 44,
      id: 49,
      src_node_id: 40,
      src_output_idx: 0
    },
    {
      dst_input_idx: 1,
      dst_node_id: 44,
      id: 50,
      src_node_id: 37,
      src_output_idx: 0
    },
    {
      dst_input_idx: 0,
      dst_node_id: 45,
      id: 51,
      src_node_id: 41,
      src_output_idx: 0
    },
    {
      dst_input_idx: 1,
      dst_node_id: 45,
      id: 52,
      src_node_id: 28,
      src_output_idx: 0
    },
    {
      dst_input_idx: 0,
      dst_node_id: 46,
      id: 53,
      src_node_id: 42,
      src_output_idx: 0
    },
    {
      dst_input_idx: 1,
      dst_node_id: 46,
      id: 54,
      src_node_id: 31,
      src_output_idx: 0
    },
    {
      dst_input_idx: 0,
      dst_node_id: 47,
      id: 55,
      src_node_id: 43,
      src_output_idx: 0
    },
    {
      dst_input_idx: 1,
      dst_node_id: 47,
      id: 56,
      src_node_id: 34,
      src_output_idx: 0
    },
    {
      dst_input_idx: 0,
      dst_node_id: 48,
      id: 57,
      src_node_id: 39,
      src_output_idx: 0
    },
    {
      dst_input_idx: 1,
      dst_node_id: 48,
      id: 58,
      src_node_id: 21,
      src_output_idx: 1
    },
    {
      dst_input_idx: 0,
      dst_node_id: 59,
      id: 61,
      src_node_id: 48,
      src_output_idx: 0
    },
    {
      dst_input_idx: 1,
      dst_node_id: 59,
      id: 62,
      src_node_id: 46,
      src_output_idx: 0
    },
    {
      dst_input_idx: 2,
      dst_node_id: 59,
      id: 63,
      src_node_id: 45,
      src_output_idx: 0
    },
    {
      dst_input_idx: 3,
      dst_node_id: 59,
      id: 64,
      src_node_id: 44,
      src_output_idx: 0
    },
    {
      dst_input_idx: 4,
      dst_node_id: 59,
      id: 65,
      src_node_id: 47,
      src_output_idx: 0
    },
    {
      dst_input_idx: 0,
      dst_node_id: 60,
      id: 66,
      src_node_id: 59,
      src_output_idx: 0
    }
  ],
  nodes: [
    {
      id: 0,
      in_ports: [],
      name: 'X_SUB_PD0_V01',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 295,
      pos_y: 205,
      type: 'Variable'
    },
    {
      id: 1,
      in_ports: [0, 1, 2, 3, 4],
      name: 'XGBoostOp',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 108,
      pos_y: 382,
      type: 'XGBoostOp'
    },
    {
      id: 3,
      in_ports: [],
      name: 'X_SUB_PD0_V02',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 513,
      pos_y: 226,
      type: 'Variable'
    },
    {
      id: 4,
      in_ports: [0, 1, 2, 3, 4],
      name: 'XGBoostOp',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 374,
      pos_y: 325,
      type: 'XGBoostOp'
    },
    {
      id: 6,
      in_ports: [],
      name: 'X_SUB_PD0_V03',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 803,
      pos_y: 345,
      type: 'Variable'
    },
    {
      id: 7,
      in_ports: [0, 1, 2, 3, 4],
      name: 'RandomForestClassifierOp',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 608,
      pos_y: 422,
      type: 'RandomForestClassifierOp'
    },
    {
      id: 9,
      in_ports: [],
      name: 'Constant',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: -5,
      pos_y: 598,
      type: 'Constant'
    },
    {
      id: 10,
      in_ports: [],
      name: 'Constant',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 145,
      pos_y: 469,
      type: 'Constant'
    },
    {
      id: 11,
      in_ports: [],
      name: 'Constant',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 407,
      pos_y: 405,
      type: 'Constant'
    },
    {
      id: 12,
      in_ports: [0, 1, 2, 3, 4],
      name: 'Multiply',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 45,
      pos_y: 734,
      type: 'Multiply'
    },
    {
      id: 13,
      in_ports: [0, 1, 2, 3, 4],
      name: 'Multiply',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 160,
      pos_y: 619,
      type: 'Multiply'
    },
    {
      id: 14,
      in_ports: [0, 1, 2, 3, 4],
      name: 'Multiply',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 371,
      pos_y: 506,
      type: 'Multiply'
    },
    {
      id: 21,
      in_ports: [0, 1, 2, 3, 4],
      name: 'Add',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 157,
      pos_y: 856,
      type: 'Add'
    },
    {
      id: 22,
      in_ports: [0],
      name: 'Output',
      out_ports: [],
      pos_x: 5,
      pos_y: 932,
      type: 'Output'
    },
    {
      id: 27,
      in_ports: [],
      name: 'X_SUB_169',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 1301,
      pos_y: 330,
      type: 'Variable'
    },
    {
      id: 28,
      in_ports: [0, 1, 2, 3, 4],
      name: 'XGBoostOp',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 897,
      pos_y: 692,
      type: 'XGBoostOp'
    },
    {
      id: 30,
      in_ports: [],
      name: 'X_SUB_PD1',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 1025,
      pos_y: 334,
      type: 'Variable'
    },
    {
      id: 31,
      in_ports: [0, 1, 2, 3, 4],
      name: 'XGBoostOp',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 637,
      pos_y: 570,
      type: 'XGBoostOp'
    },
    {
      id: 33,
      in_ports: [],
      name: 'X_SUB_111_V01',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 2067,
      pos_y: 350,
      type: 'Variable'
    },
    {
      id: 34,
      in_ports: [0, 1, 2, 3, 4],
      name: 'XGBoostOp',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 1861,
      pos_y: 664,
      type: 'XGBoostOp'
    },
    {
      id: 36,
      in_ports: [],
      name: 'X_SUB_PD0_HISTORY',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 1643,
      pos_y: 330,
      type: 'Variable'
    },
    {
      id: 37,
      in_ports: [0, 1, 2, 3, 4],
      name: 'XGBoostOp',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 1197,
      pos_y: 696,
      type: 'XGBoostOp'
    },
    {
      id: 39,
      in_ports: [],
      name: 'Constant',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 8,
      pos_y: 1003,
      type: 'Constant'
    },
    {
      id: 40,
      in_ports: [],
      name: 'Constant',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 917,
      pos_y: 792,
      type: 'Constant'
    },
    {
      id: 41,
      in_ports: [],
      name: 'Constant',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 629,
      pos_y: 674,
      type: 'Constant'
    },
    {
      id: 42,
      in_ports: [],
      name: 'Constant',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 413,
      pos_y: 574,
      type: 'Constant'
    },
    {
      id: 43,
      in_ports: [],
      name: 'Constant',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 1643,
      pos_y: 662,
      type: 'Constant'
    },
    {
      id: 44,
      in_ports: [0, 1, 2, 3, 4],
      name: 'Multiply',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 997,
      pos_y: 954,
      type: 'Multiply'
    },
    {
      id: 45,
      in_ports: [0, 1, 2, 3, 4],
      name: 'Multiply',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 671,
      pos_y: 788,
      type: 'Multiply'
    },
    {
      id: 46,
      in_ports: [0, 1, 2, 3, 4],
      name: 'Multiply',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 371,
      pos_y: 790,
      type: 'Multiply'
    },
    {
      id: 47,
      in_ports: [0, 1, 2, 3, 4],
      name: 'Multiply',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 1495,
      pos_y: 942,
      type: 'Multiply'
    },
    {
      id: 48,
      in_ports: [0, 1, 2, 3, 4],
      name: 'Multiply',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 303,
      pos_y: 1122,
      type: 'Multiply'
    },
    {
      id: 59,
      in_ports: [0, 1, 2, 3, 4],
      name: 'Add',
      out_ports: [0, 1, 2, 3, 4],
      pos_x: 887,
      pos_y: 1180,
      type: 'Add'
    },
    {
      id: 60,
      in_ports: [0],
      name: 'Output2',
      out_ports: [],
      pos_x: 881,
      pos_y: 1266,
      type: 'Output'
    }
  ]
}

export const leads = [{
  label: 'simple example',
  children: [{
    label: 'basic',
    value: simple_example_data
  }, {
    label: 'expend edges',
    value: edges_example_data
  }, {
    label: 'expend nodes',
    value: nodes_example_data
  }, {
    label: 'add ports',
    value: ports_example_data
  }, {
    label: 'edge text',
    value: text_example_data
  }, {
    label: 'personal r_click',
    value: simple_r_click_data
  }]
}, {
  label: 'complex example',
  children: [{
    label: 'basic',
    value: complex_example_data
  }]
}]

export const animationJSON = [
  {
      "edges": [],
      "nodes": [
          {
              "id": 1,
              "in_ports": [],
              "name": "遇到DAG需求",
              "out_ports": [
                  0
              ],
              "iconClassName": "el-icon-loading",
              "pos_x": 254.3142857142857,
              "pos_y": 24.838095238095207
          }
      ]
  },
  {"edges": [], "nodes": [{"id": 1, "in_ports": [], "name": "遇到DAG需求", "out_ports": [0], "iconClassName": "el-icon-loading", "pos_x": 254.3142857142857, "pos_y": 24.838095238095207}, {"pos_x": 424.6666666666667, "pos_y": 113.33333333333333, "name": "React可用React-Diagram", "id": 101, "in_ports": [0], "out_ports": [0]}]},
  {"edges": [], "nodes": [{"id": 1, "in_ports": [], "name": "遇到DAG需求", "out_ports": [0], "iconClassName": "el-icon-loading", "pos_x": 254.3142857142857, "pos_y": 24.838095238095207}, {"pos_x": 424.6666666666667, "pos_y": 113.33333333333333, "name": "React可用React-Diagram", "id": 101, "in_ports": [0], "out_ports": [0]}, {"pos_x": 104.66666666666666, "pos_y": 125.33333333333334, "name": "Vue可参考本项目~", "id": 102, "in_ports": [0], "out_ports": [0]}]}, {"edges": [{"src_node_id": 1, "src_output_idx": 0, "dst_node_id": 102, "dst_input_idx": 0, "id": 10}], "nodes": [{"id": 1, "in_ports": [], "name": "遇到DAG需求", "out_ports": [0], "iconClassName": "el-icon-loading", "pos_x": 254.3142857142857, "pos_y": 24.838095238095207}, {"pos_x": 424.6666666666667, "pos_y": 113.33333333333333, "name": "React可用React-Diagram", "id": 101, "in_ports": [0], "out_ports": [0]}, {"pos_x": 104.66666666666666, "pos_y": 125.33333333333334, "name": "Vue可参考本项目~", "id": 102, "in_ports": [0], "out_ports": [0]}]}, {"edges": [{"src_node_id": 1, "src_output_idx": 0, "dst_node_id": 102, "dst_input_idx": 0, "id": 10}, {"src_node_id": 102, "src_output_idx": 0, "dst_node_id": 103, "dst_input_idx": 0, "id": 11}], "nodes": [{"id": 1, "in_ports": [], "name": "遇到DAG需求", "out_ports": [0], "iconClassName": "el-icon-loading", "pos_x": 254.3142857142857, "pos_y": 24.838095238095207}, {"pos_x": 424.6666666666667, "pos_y": 113.33333333333333, "name": "React可用React-Diagram", "id": 101, "in_ports": [0], "out_ports": [0]}, {"pos_x": 104.66666666666666, "pos_y": 125.33333333333334, "name": "Vue可参考本项目~", "id": 102, "iconClassName": "el-icon-loading", "in_ports": [0], "out_ports": [0]}, {"pos_x": 42, "pos_y": 237.66666666666666, "name": "如果有不懂的地方", "id": 103, "in_ports": [0], "out_ports": [0]}]}, {"edges": [{"src_node_id": 1, "src_output_idx": 0, "dst_node_id": 102, "dst_input_idx": 0, "id": 10}, {"src_node_id": 102, "src_output_idx": 0, "dst_node_id": 103, "dst_input_idx": 0, "id": 11}, {"src_node_id": 103, "src_output_idx": 1, "dst_node_id": 101, "dst_input_idx": 0, "id": 12, "style": {"stroke-width": "4px", "stroke": "red", "animation": "none", "stroke-dasharray": "0px"}}], "nodes": [{"id": 1, "in_ports": [], "name": "遇到DAG需求", "out_ports": [0], "pos_x": 254.3142857142857, "pos_y": 24.838095238095207}, {"pos_x": 424.6666666666667, "pos_y": 113.33333333333333, "name": "React可用React-Diagram", "id": 101, "in_ports": [0], "out_ports": [0]}, {"pos_x": 104.66666666666666, "pos_y": 125.33333333333334, "name": "Vue可参考本项目~", "id": 102, "iconClassName": "el-icon-loading", "in_ports": [0], "out_ports": [0]}, {"pos_x": 42, "pos_y": 237.66666666666666, "name": "如果有不懂的地方", "id": 103, "iconClassName": "el-icon-loading", "in_ports": [0], "out_ports": [0, 1]}]}, {"edges": [{"src_node_id": 1, "src_output_idx": 0, "dst_node_id": 102, "dst_input_idx": 0, "id": 10}, {"src_node_id": 102, "src_output_idx": 0, "dst_node_id": 103, "dst_input_idx": 0, "id": 11}, {"src_node_id": 103, "src_output_idx": 1, "dst_node_id": 101, "dst_input_idx": 0, "id": 12, "style": {"stroke-width": "4px", "stroke": "red", "animation": "none", "stroke-dasharray": "0px"}, "edgesText": "FAKE NEWS !"}], "nodes": [{"id": 1, "in_ports": [], "name": "遇到DAG需求", "out_ports": [0], "pos_x": 254.3142857142857, "pos_y": 24.838095238095207}, {"pos_x": 424.6666666666667, "pos_y": 113.33333333333333, "name": "React可用React-Diagram", "id": 101, "in_ports": [0], "out_ports": [0]}, {"pos_x": 104.66666666666666, "pos_y": 125.33333333333334, "name": "Vue可参考本项目~", "id": 102, "iconClassName": "el-icon-loading", "in_ports": [0], "out_ports": [0]}, {"pos_x": 42, "pos_y": 237.66666666666666, "name": "如果有不懂的地方", "id": 103, "iconClassName": "el-icon-loading", "in_ports": [0], "out_ports": [0, 1]}, {"pos_x": 183.66666666666669, "pos_y": 374.3333333333333, "name": "qq群 793841737", "id": 104, "in_ports": [0], "out_ports": [0]}]}, {"edges": [{"src_node_id": 1, "src_output_idx": 0, "dst_node_id": 102, "dst_input_idx": 0, "id": 10}, {"src_node_id": 102, "src_output_idx": 0, "dst_node_id": 103, "dst_input_idx": 0, "id": 11}, {"src_node_id": 103, "src_output_idx": 1, "dst_node_id": 101, "dst_input_idx": 0, "id": 12, "style": {"stroke-width": "4px", "stroke": "red", "animation": "none", "stroke-dasharray": "0px"}, "edgesText": "FAKE NEWS !"}], "nodes": [{"id": 1, "in_ports": [], "name": "遇到DAG需求", "out_ports": [0], "pos_x": 254.3142857142857, "pos_y": 24.838095238095207}, {"pos_x": 424.6666666666667, "pos_y": 113.33333333333333, "name": "React可用React-Diagram", "id": 101, "in_ports": [0], "out_ports": [0]}, {"pos_x": 104.66666666666666, "pos_y": 125.33333333333334, "name": "Vue可参考本项目~", "id": 102, "iconClassName": "el-icon-loading", "in_ports": [0], "out_ports": [0]}, {"pos_x": 42, "pos_y": 237.66666666666666, "name": "如果有不懂的地方", "id": 103, "iconClassName": "el-icon-loading", "in_ports": [0], "out_ports": [0, 1]}, {"pos_x": 183.66666666666669, "pos_y": 374.3333333333333, "name": "qq群 793841737", "id": 104, "in_ports": [0], "out_ports": [0]}]}, {"edges": [{"src_node_id": 1, "src_output_idx": 0, "dst_node_id": 102, "dst_input_idx": 0, "id": 10}, {"src_node_id": 102, "src_output_idx": 0, "dst_node_id": 103, "dst_input_idx": 0, "id": 11}, {"src_node_id": 103, "src_output_idx": 1, "dst_node_id": 101, "dst_input_idx": 0, "id": 12, "style": {"stroke-width": "4px", "stroke": "red", "animation": "none", "stroke-dasharray": "0px"}, "edgesText": "FAKE NEWS !"}, {"src_node_id": 103, "src_output_idx": 0, "dst_node_id": 104, "dst_input_idx": 0, "id": 13}], "nodes": [{"id": 1, "in_ports": [], "name": "遇到DAG需求", "out_ports": [0], "pos_x": 254.3142857142857, "pos_y": 24.838095238095207}, {"pos_x": 424.6666666666667, "pos_y": 113.33333333333333, "name": "React可用React-Diagram", "id": 101, "in_ports": [0], "out_ports": [0]}, {"pos_x": 104.66666666666666, "pos_y": 125.33333333333334, "name": "Vue可参考本项目~", "id": 102, "in_ports": [0], "out_ports": [0]}, {"pos_x": 42, "pos_y": 237.66666666666666, "name": "如果有不懂的地方", "id": 103, "iconClassName": "el-icon-loading", "in_ports": [0], "out_ports": [0, 1]}, {"pos_x": 183.66666666666669, "pos_y": 374.3333333333333, "name": "qq群 793841737", "id": 104, "in_ports": [0], "out_ports": [0]}]}, {"edges": [{"src_node_id": 1, "src_output_idx": 0, "dst_node_id": 102, "dst_input_idx": 0, "id": 10, "style": {"stroke-width": "4px", "animation": "none", "stroke-dasharray": "0px"}}, {"src_node_id": 102, "src_output_idx": 0, "dst_node_id": 103, "dst_input_idx": 0, "id": 11, "style": {"stroke-width": "4px", "animation": "none", "stroke-dasharray": "0px"}}, {"src_node_id": 103, "src_output_idx": 1, "dst_node_id": 101, "dst_input_idx": 0, "id": 12, "style": {"stroke-width": "4px", "stroke": "red", "animation": "none", "stroke-dasharray": "0px"}, "edgesText": "FAKE NEWS !"}, {"src_node_id": 103, "src_output_idx": 0, "dst_node_id": 104, "dst_input_idx": 0, "id": 13, "style": {"stroke-width": "4px", "animation": "none", "stroke-dasharray": "0px"}}], "nodes": [{"id": 1, "in_ports": [], "name": "遇到DAG需求", "out_ports": [0], "pos_x": 254.3142857142857, "pos_y": 24.838095238095207}, {"pos_x": 424.6666666666667, "pos_y": 113.33333333333333, "name": "React可用React-Diagram", "id": 101, "in_ports": [0], "out_ports": [0]}, {"pos_x": 104.66666666666666, "pos_y": 125.33333333333334, "name": "Vue可参考本项目~", "id": 102, "in_ports": [0], "out_ports": [0]}, {"pos_x": 42, "pos_y": 237.66666666666666, "name": "如果有不懂的地方", "id": 103, "iconClassName": "el-icon-loading", "in_ports": [0], "out_ports": [0, 1]}, {"pos_x": 183.66666666666669, "pos_y": 374.3333333333333, "name": "qq群 793841737", "id": 104, "in_ports": [0], "out_ports": [0]}]}]
