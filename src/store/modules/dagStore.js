
const dagStore = {
  state: {
    DataAll: {
      nodes: [{
        name: "name1",
        id: 1,
        imgContent: "",
        pos_x: 200,
        pos_y: 40,
        type: 'constant',
        in_ports: [0, 1, 2],
        out_ports: [0, 1, 2, 3, 4]
      }, {
        name: "name2",
        id: 5,
        imgContent: "",
        pos_x: 400,
        pos_y: 80,
        type: 'constant',
        in_ports: [0, 1, 2, 3],
        out_ports: [0, 1, 2, 3, 4]
      }, {
        name: "name3",
        id: 6,
        imgContent: "",
        pos_x: 500,
        pos_y: 300,
        type: 'constant',
        in_ports: [0],
        out_ports: [0, 1, 2, 3, 4]
      }, {
        name: "name4",
        id: 7,
        imgContent: "",
        pos_x: 300,
        pos_y: 500,
        type: 'constant',
        in_ports: [0, 1, 2, 3],
        out_ports: [0, 1, 2, 3, 4]
      }, {
        name: "name5",
        id: 2,
        imgContent: "",
        pos_x: 300,
        pos_y: 400,
        type: 'constant',
        in_ports: [0, 1, 2, 3, 4],
        out_ports: [0, 1, 2]
      }],
      edges: [{
        dst_input_idx: 1,
        dst_node_id: 1,
        src_node_id: 2,
        src_output_idx: 2
      }, {
        dst_input_idx: 2,
        dst_node_id: 1,
        src_node_id: 2,
        src_output_idx: 4
      }],
      model_id: 21
    }
  },
  actions: {
    openGraph: ({ commit }, model_id) => { // 打开图
    },
    showGraph: ({ commit }, model_id) => { // 打开暂存的图
    },
    newGraph: ({ commit }, params) => { // 新增图
    },
    addEdge: ({ commit }, params) => { // 增加边
    },
    delEdge: ({ commit }, params) => { // 删除边
    },
    moveNode: ({ commit }, params) => { // 移动点的位置
    },
    addNode: ({ commit }, params) => { // 增加节点
    },
    delNode: ({ commit }, params) => { // 删除节点
    },
    saveGraph: () => {
    }
  },
  mutations: {
    UPDATE_DATA: (state, data) => {
      state.DataAll = data;
    }
  }
};

export default dagStore;
