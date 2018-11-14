
const dagStore = {
  state: {
    DataAll: { "edges": [{ "dst_input_idx": 0, "dst_node_id": 1, "id": 2, "src_node_id": 0, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 4, "id": 5, "src_node_id": 3, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 7, "id": 8, "src_node_id": 6, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 12, "id": 15, "src_node_id": 9, "src_output_idx": 0 }, { "dst_input_idx": 1, "dst_node_id": 12, "id": 16, "src_node_id": 1, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 13, "id": 17, "src_node_id": 10, "src_output_idx": 0 }, { "dst_input_idx": 1, "dst_node_id": 13, "id": 18, "src_node_id": 4, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 14, "id": 19, "src_node_id": 11, "src_output_idx": 0 }, { "dst_input_idx": 1, "dst_node_id": 14, "id": 20, "src_node_id": 7, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 21, "id": 23, "src_node_id": 12, "src_output_idx": 0 }, { "dst_input_idx": 1, "dst_node_id": 21, "id": 24, "src_node_id": 13, "src_output_idx": 0 }, { "dst_input_idx": 2, "dst_node_id": 21, "id": 25, "src_node_id": 14, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 22, "id": 26, "src_node_id": 21, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 28, "id": 29, "src_node_id": 27, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 31, "id": 32, "src_node_id": 30, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 34, "id": 35, "src_node_id": 33, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 37, "id": 38, "src_node_id": 36, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 44, "id": 49, "src_node_id": 40, "src_output_idx": 0 }, { "dst_input_idx": 1, "dst_node_id": 44, "id": 50, "src_node_id": 37, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 45, "id": 51, "src_node_id": 41, "src_output_idx": 0 }, { "dst_input_idx": 1, "dst_node_id": 45, "id": 52, "src_node_id": 28, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 46, "id": 53, "src_node_id": 42, "src_output_idx": 0 }, { "dst_input_idx": 1, "dst_node_id": 46, "id": 54, "src_node_id": 31, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 47, "id": 55, "src_node_id": 43, "src_output_idx": 0 }, { "dst_input_idx": 1, "dst_node_id": 47, "id": 56, "src_node_id": 34, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 48, "id": 57, "src_node_id": 39, "src_output_idx": 0 }, { "dst_input_idx": 1, "dst_node_id": 48, "id": 58, "src_node_id": 21, "src_output_idx": 1 }, { "dst_input_idx": 0, "dst_node_id": 59, "id": 61, "src_node_id": 48, "src_output_idx": 0 }, { "dst_input_idx": 1, "dst_node_id": 59, "id": 62, "src_node_id": 46, "src_output_idx": 0 }, { "dst_input_idx": 2, "dst_node_id": 59, "id": 63, "src_node_id": 45, "src_output_idx": 0 }, { "dst_input_idx": 3, "dst_node_id": 59, "id": 64, "src_node_id": 44, "src_output_idx": 0 }, { "dst_input_idx": 4, "dst_node_id": 59, "id": 65, "src_node_id": 47, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 60, "id": 66, "src_node_id": 59, "src_output_idx": 0 }], "nodes": [{ "id": 0, "in_ports": [], "name": "X_SUB_PD0_V01", "out_ports": [0, 1, 2, 3, 4], "pos_x": 295, "pos_y": 205, "type": "Variable" }, { "id": 1, "in_ports": [0, 1, 2, 3, 4], "name": "XGBoostOp", "out_ports": [0, 1, 2, 3, 4], "pos_x": 108, "pos_y": 382, "type": "XGBoostOp" }, { "id": 3, "in_ports": [], "name": "X_SUB_PD0_V02", "out_ports": [0, 1, 2, 3, 4], "pos_x": 513, "pos_y": 226, "type": "Variable" }, { "id": 4, "in_ports": [0, 1, 2, 3, 4], "name": "XGBoostOp", "out_ports": [0, 1, 2, 3, 4], "pos_x": 374, "pos_y": 325, "type": "XGBoostOp" }, { "id": 6, "in_ports": [], "name": "X_SUB_PD0_V03", "out_ports": [0, 1, 2, 3, 4], "pos_x": 803, "pos_y": 345, "type": "Variable" }, { "id": 7, "in_ports": [0, 1, 2, 3, 4], "name": "RandomForestClassifierOp", "out_ports": [0, 1, 2, 3, 4], "pos_x": 608, "pos_y": 422, "type": "RandomForestClassifierOp" }, { "id": 9, "in_ports": [], "name": "Constant", "out_ports": [0, 1, 2, 3, 4], "pos_x": -5, "pos_y": 598, "type": "Constant" }, { "id": 10, "in_ports": [], "name": "Constant", "out_ports": [0, 1, 2, 3, 4], "pos_x": 145, "pos_y": 469, "type": "Constant" }, { "id": 11, "in_ports": [], "name": "Constant", "out_ports": [0, 1, 2, 3, 4], "pos_x": 407, "pos_y": 405, "type": "Constant" }, { "id": 12, "in_ports": [0, 1, 2, 3, 4], "name": "Multiply", "out_ports": [0, 1, 2, 3, 4], "pos_x": 45, "pos_y": 734, "type": "Multiply" }, { "id": 13, "in_ports": [0, 1, 2, 3, 4], "name": "Multiply", "out_ports": [0, 1, 2, 3, 4], "pos_x": 160, "pos_y": 619, "type": "Multiply" }, { "id": 14, "in_ports": [0, 1, 2, 3, 4], "name": "Multiply", "out_ports": [0, 1, 2, 3, 4], "pos_x": 371, "pos_y": 506, "type": "Multiply" }, { "id": 21, "in_ports": [0, 1, 2, 3, 4], "name": "Add", "out_ports": [0, 1, 2, 3, 4], "pos_x": 157, "pos_y": 856, "type": "Add" }, { "id": 22, "in_ports": [0], "name": "Output", "out_ports": [], "pos_x": 5, "pos_y": 932, "type": "Output" }, { "id": 27, "in_ports": [], "name": "X_SUB_169", "out_ports": [0, 1, 2, 3, 4], "pos_x": 1301, "pos_y": 330, "type": "Variable" }, { "id": 28, "in_ports": [0, 1, 2, 3, 4], "name": "XGBoostOp", "out_ports": [0, 1, 2, 3, 4], "pos_x": 897, "pos_y": 692, "type": "XGBoostOp" }, { "id": 30, "in_ports": [], "name": "X_SUB_PD1", "out_ports": [0, 1, 2, 3, 4], "pos_x": 1025, "pos_y": 334, "type": "Variable" }, { "id": 31, "in_ports": [0, 1, 2, 3, 4], "name": "XGBoostOp", "out_ports": [0, 1, 2, 3, 4], "pos_x": 637, "pos_y": 570, "type": "XGBoostOp" }, { "id": 33, "in_ports": [], "name": "X_SUB_111_V01", "out_ports": [0, 1, 2, 3, 4], "pos_x": 2067, "pos_y": 350, "type": "Variable" }, { "id": 34, "in_ports": [0, 1, 2, 3, 4], "name": "XGBoostOp", "out_ports": [0, 1, 2, 3, 4], "pos_x": 1861, "pos_y": 664, "type": "XGBoostOp" }, { "id": 36, "in_ports": [], "name": "X_SUB_PD0_HISTORY", "out_ports": [0, 1, 2, 3, 4], "pos_x": 1643, "pos_y": 330, "type": "Variable" }, { "id": 37, "in_ports": [0, 1, 2, 3, 4], "name": "XGBoostOp", "out_ports": [0, 1, 2, 3, 4], "pos_x": 1197, "pos_y": 696, "type": "XGBoostOp" }, { "id": 39, "in_ports": [], "name": "Constant", "out_ports": [0, 1, 2, 3, 4], "pos_x": 8, "pos_y": 1003, "type": "Constant" }, { "id": 40, "in_ports": [], "name": "Constant", "out_ports": [0, 1, 2, 3, 4], "pos_x": 917, "pos_y": 792, "type": "Constant" }, { "id": 41, "in_ports": [], "name": "Constant", "out_ports": [0, 1, 2, 3, 4], "pos_x": 629, "pos_y": 674, "type": "Constant" }, { "id": 42, "in_ports": [], "name": "Constant", "out_ports": [0, 1, 2, 3, 4], "pos_x": 413, "pos_y": 574, "type": "Constant" }, { "id": 43, "in_ports": [], "name": "Constant", "out_ports": [0, 1, 2, 3, 4], "pos_x": 1643, "pos_y": 662, "type": "Constant" }, { "id": 44, "in_ports": [0, 1, 2, 3, 4], "name": "Multiply", "out_ports": [0, 1, 2, 3, 4], "pos_x": 997, "pos_y": 954, "type": "Multiply" }, { "id": 45, "in_ports": [0, 1, 2, 3, 4], "name": "Multiply", "out_ports": [0, 1, 2, 3, 4], "pos_x": 671, "pos_y": 788, "type": "Multiply" }, { "id": 46, "in_ports": [0, 1, 2, 3, 4], "name": "Multiply", "out_ports": [0, 1, 2, 3, 4], "pos_x": 371, "pos_y": 790, "type": "Multiply" }, { "id": 47, "in_ports": [0, 1, 2, 3, 4], "name": "Multiply", "out_ports": [0, 1, 2, 3, 4], "pos_x": 1495, "pos_y": 942, "type": "Multiply" }, { "id": 48, "in_ports": [0, 1, 2, 3, 4], "name": "Multiply", "out_ports": [0, 1, 2, 3, 4], "pos_x": 303, "pos_y": 1122, "type": "Multiply" }, { "id": 59, "in_ports": [0, 1, 2, 3, 4], "name": "Add", "out_ports": [0, 1, 2, 3, 4], "pos_x": 887, "pos_y": 1180, "type": "Add" }, { "id": 60, "in_ports": [0], "name": "Output2", "out_ports": [], "pos_x": 881, "pos_y": 1266, "type": "Output" }] },
    svgSize: 1
  },
  actions: {
    openGraph: ({ commit }, model_id) => { // 打开图
    },
    showGraph: ({ commit }, model_id) => { // 打开暂存的图
    },
    newGraph: ({ commit }, params) => { // 新增图
    },
    addEdge: ({ commit }, { desp }) => { // 增加边
      console.log(desp)
      commit('ADD_EDGE_DATA', desp)
    },
    delEdge: ({ commit }, { id }) => { // 删除边
      commit('DEL_EDGE_DATA', id)
    },
    moveNode: ({ commit }, params) => { // 移动点的位置
      commit('MOVE_NODE_DATA', params)
    },
    addNode: ({ commit }, params) => { // 增加节点
      commit('ADD_NODE_DATA', params)
    },
    delNode: ({ commit }, { id }) => { // 删除节点
      commit('DEL_NODE_DATA', id)
    },
    saveGraph: () => {
    },
    changeSize: ({ commit }, action) => { // 改变size
      commit('CHANGE_SIZE', action)
    }
  },
  mutations: {
    CHANGE_SIZE: (state, action) => {
      switch (action) {
        case 'init':
          state.svgSize = 1
          break
        case 'expend':
          state.svgSize += 0.1
          break
        case 'shrink':
          state.svgSize -= 0.1
          break
        default: state.svgSize = state.svgSize
      }
      sessionStorage['svgScale'] = state.svgSize
    },
    UPDATE_DATA: (state, data) => {
      state.DataAll = data;
    },
    MOVE_NODE_DATA: (state, params) => {
      let _DataAll = state.DataAll
      _DataAll.nodes.forEach((item, i) => {
        if (item.id === params.id) {
          item.pos_x = params.pos_x
          item.pos_y = params.pos_y
        }
      })
    },
    ADD_EDGE_DATA: (state, desp) => {
      let _DataAll = state.DataAll
      _DataAll.edges.push({
        ...desp,
        id: state.DataAll.edges.length + 10
      })
      /**
       * 检测是否成环
       **/
      let isCircle = false
      const { dst_node_id } = desp // 出口 入口id
      const checkCircle = (dst_node_id, nth) => {
        if (nth > _DataAll.nodes.length) {
          isCircle = true
          return false
        } else {
          _DataAll.edges.forEach(item => {
            if (item.src_node_id === dst_node_id) {
              console.log('目标节点是', item.src_node_id, '次数为', nth)
              checkCircle(item.dst_node_id, ++nth)
            }
          })
        }
      }
      checkCircle(dst_node_id, 1)
      if (isCircle) {
        _DataAll.edges.pop()
        alert('禁止成环')
      }
    },
    DEL_EDGE_DATA: (state, id) => {
      let _edges = []
      state.DataAll.edges.forEach((item, i) => {
        if (item.id !== id) {
          _edges.push(item)
        }
      })
      state.DataAll.edges = _edges
    },
    DEL_NODE_DATA: (state, id) => {
      let _edges = []
      let _nodes = []
      state.DataAll.edges.forEach(item => {
        if (item.dst_node_id !== id && item.src_node_id !== id) {
          _edges.push(item)
        }
      })
      state.DataAll.nodes.forEach(item => {
        if (item.id !== id) {
          _nodes.push(item)
        }
      })
      state.DataAll.edges = _edges
      state.DataAll.nodes = _nodes
    },
    ADD_NODE_DATA: (state, params) => {
      let _nodes = state.DataAll.nodes
      _nodes.push({
        ...params.desp,
        id: state.DataAll.nodes.length + 100,
        in_ports: [0, 1, 2, 3, 4],
        out_ports: [0, 1, 2, 3, 4]
      })
    }
  }
};

export default dagStore;
