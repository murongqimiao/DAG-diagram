<template>
  <div class="page-content" @mousedown="startNodesBus($event)" @mousemove="moveNodesBus($event)" @mouseup="endNodesBus($event)">
    <div class="headbar">
      <p @mousedown="dragIt('这里是名称')">拖动</p>
    </div>
    <DAGBoard :DataAll="DataAll" @updateDAG="updateDAG"></DAGBoard>
    <node-bus v-if="dragBus" :value="busValue.value" :pos_x="busValue.pos_x" :pos_y="busValue.pos_y" />
  </div>
</template>

<script>

export default {
  data() {
    return {
      dragBus: false,
      busValue: {
        value: "name",
        pos_x: 100,
        pos_y: 100
      },
      DataAll: { "edges": [{ style: "stroke: red !important;", "dst_input_idx": 0, "dst_node_id": 1, "id": 2, "src_node_id": 0, "src_output_idx": 0, "type": "active" }, { "dst_input_idx": 0, "dst_node_id": 4, "id": 5, "src_node_id": 3, "src_output_idx": 0, "type": "active" }, { "dst_input_idx": 0, "dst_node_id": 7, "id": 8, "src_node_id": 6, "src_output_idx": 0, "type": "active" }, { "dst_input_idx": 0, "dst_node_id": 12, "id": 15, "src_node_id": 9, "src_output_idx": 0, "type": "active" }, { "dst_input_idx": 1, "dst_node_id": 12, "id": 16, "src_node_id": 1, "src_output_idx": 0, "type": "active" }, { "dst_input_idx": 0, "dst_node_id": 13, "id": 17, "src_node_id": 10, "src_output_idx": 0, "type": "active" }, { "dst_input_idx": 1, "dst_node_id": 13, "id": 18, "src_node_id": 4, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 14, "id": 19, "src_node_id": 11, "src_output_idx": 0 }, { "dst_input_idx": 1, "dst_node_id": 14, "id": 20, "src_node_id": 7, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 21, "id": 23, "src_node_id": 12, "src_output_idx": 0 }, { "dst_input_idx": 1, "dst_node_id": 21, "id": 24, "src_node_id": 13, "src_output_idx": 0 }, { "dst_input_idx": 2, "dst_node_id": 21, "id": 25, "src_node_id": 14, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 22, "id": 26, "src_node_id": 21, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 28, "id": 29, "src_node_id": 27, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 31, "id": 32, "src_node_id": 30, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 34, "id": 35, "src_node_id": 33, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 37, "id": 38, "src_node_id": 36, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 44, "id": 49, "src_node_id": 40, "src_output_idx": 0 }, { "dst_input_idx": 1, "dst_node_id": 44, "id": 50, "src_node_id": 37, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 45, "id": 51, "src_node_id": 41, "src_output_idx": 0 }, { "dst_input_idx": 1, "dst_node_id": 45, "id": 52, "src_node_id": 28, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 46, "id": 53, "src_node_id": 42, "src_output_idx": 0 }, { "dst_input_idx": 1, "dst_node_id": 46, "id": 54, "src_node_id": 31, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 47, "id": 55, "src_node_id": 43, "src_output_idx": 0 }, { "dst_input_idx": 1, "dst_node_id": 47, "id": 56, "src_node_id": 34, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 48, "id": 57, "src_node_id": 39, "src_output_idx": 0 }, { "dst_input_idx": 1, "dst_node_id": 48, "id": 58, "src_node_id": 21, "src_output_idx": 1 }, { "dst_input_idx": 0, "dst_node_id": 59, "id": 61, "src_node_id": 48, "src_output_idx": 0 }, { "dst_input_idx": 1, "dst_node_id": 59, "id": 62, "src_node_id": 46, "src_output_idx": 0 }, { "dst_input_idx": 2, "dst_node_id": 59, "id": 63, "src_node_id": 45, "src_output_idx": 0 }, { "dst_input_idx": 3, "dst_node_id": 59, "id": 64, "src_node_id": 44, "src_output_idx": 0 }, { "dst_input_idx": 4, "dst_node_id": 59, "id": 65, "src_node_id": 47, "src_output_idx": 0 }, { "dst_input_idx": 0, "dst_node_id": 60, "id": 66, "src_node_id": 59, "src_output_idx": 0 }], "nodes": [{ "id": 0, "in_ports": [], "name": "X_SUB_PD0_V01", "out_ports": [0, 1, 2, 3, 4], "pos_x": 295, "pos_y": 205, "type": "Variable" }, { "id": 1, "in_ports": [0, 1, 2, 3, 4], "name": "XGBoostOp", "out_ports": [0, 1, 2, 3, 4], "pos_x": 108, "pos_y": 382, "type": "XGBoostOp" }, { "id": 3, "in_ports": [], "name": "X_SUB_PD0_V02", "out_ports": [0, 1, 2, 3, 4], "pos_x": 513, "pos_y": 226, "type": "Variable" }, { "id": 4, "in_ports": [0, 1, 2, 3, 4], "name": "XGBoostOp", "out_ports": [0, 1, 2, 3, 4], "pos_x": 374, "pos_y": 325, "type": "XGBoostOp" }, { "id": 6, "in_ports": [], "name": "X_SUB_PD0_V03", "out_ports": [0, 1, 2, 3, 4], "pos_x": 803, "pos_y": 345, "type": "Variable" }, { "id": 7, "in_ports": [0, 1, 2, 3, 4], "name": "RandomForestClassifierOp", "out_ports": [0, 1, 2, 3, 4], "pos_x": 608, "pos_y": 422, "type": "RandomForestClassifierOp" }, { "id": 9, "in_ports": [], "name": "Constant", "out_ports": [0, 1, 2, 3, 4], "pos_x": -5, "pos_y": 598, "type": "Constant" }, { "id": 10, "in_ports": [], "name": "Constant", "out_ports": [0, 1, 2, 3, 4], "pos_x": 145, "pos_y": 469, "type": "Constant" }, { "id": 11, "in_ports": [], "name": "Constant", "out_ports": [0, 1, 2, 3, 4], "pos_x": 407, "pos_y": 405, "type": "Constant" }, { "id": 12, "in_ports": [0, 1, 2, 3, 4], "name": "Multiply", "out_ports": [0, 1, 2, 3, 4], "pos_x": 45, "pos_y": 734, "type": "Multiply" }, { "id": 13, "in_ports": [0, 1, 2, 3, 4], "name": "Multiply", "out_ports": [0, 1, 2, 3, 4], "pos_x": 160, "pos_y": 619, "type": "Multiply" }, { "id": 14, "in_ports": [0, 1, 2, 3, 4], "name": "Multiply", "out_ports": [0, 1, 2, 3, 4], "pos_x": 371, "pos_y": 506, "type": "Multiply" }, { "id": 21, "in_ports": [0, 1, 2, 3, 4], "name": "Add", "out_ports": [0, 1, 2, 3, 4], "pos_x": 157, "pos_y": 856, "type": "Add" }, { "id": 22, "in_ports": [0], "name": "Output", "out_ports": [], "pos_x": 5, "pos_y": 932, "type": "Output" }, { "id": 27, "in_ports": [], "name": "X_SUB_169", "out_ports": [0, 1, 2, 3, 4], "pos_x": 1301, "pos_y": 330, "type": "Variable" }, { "id": 28, "in_ports": [0, 1, 2, 3, 4], "name": "XGBoostOp", "out_ports": [0, 1, 2, 3, 4], "pos_x": 897, "pos_y": 692, "type": "XGBoostOp" }, { "id": 30, "in_ports": [], "name": "X_SUB_PD1", "out_ports": [0, 1, 2, 3, 4], "pos_x": 1025, "pos_y": 334, "type": "Variable" }, { "id": 31, "in_ports": [0, 1, 2, 3, 4], "name": "XGBoostOp", "out_ports": [0, 1, 2, 3, 4], "pos_x": 637, "pos_y": 570, "type": "XGBoostOp" }, { "id": 33, "in_ports": [], "name": "X_SUB_111_V01", "out_ports": [0, 1, 2, 3, 4], "pos_x": 2067, "pos_y": 350, "type": "Variable" }, { "id": 34, "in_ports": [0, 1, 2, 3, 4], "name": "XGBoostOp", "out_ports": [0, 1, 2, 3, 4], "pos_x": 1861, "pos_y": 664, "type": "XGBoostOp" }, { "id": 36, "in_ports": [], "name": "X_SUB_PD0_HISTORY", "out_ports": [0, 1, 2, 3, 4], "pos_x": 1643, "pos_y": 330, "type": "Variable" }, { "id": 37, "in_ports": [0, 1, 2, 3, 4], "name": "XGBoostOp", "out_ports": [0, 1, 2, 3, 4], "pos_x": 1197, "pos_y": 696, "type": "XGBoostOp" }, { "id": 39, "in_ports": [], "name": "Constant", "out_ports": [0, 1, 2, 3, 4], "pos_x": 8, "pos_y": 1003, "type": "Constant" }, { "id": 40, "in_ports": [], "name": "Constant", "out_ports": [0, 1, 2, 3, 4], "pos_x": 917, "pos_y": 792, "type": "Constant" }, { "id": 41, "in_ports": [], "name": "Constant", "out_ports": [0, 1, 2, 3, 4], "pos_x": 629, "pos_y": 674, "type": "Constant" }, { "id": 42, "in_ports": [], "name": "Constant", "out_ports": [0, 1, 2, 3, 4], "pos_x": 413, "pos_y": 574, "type": "Constant" }, { "id": 43, "in_ports": [], "name": "Constant", "out_ports": [0, 1, 2, 3, 4], "pos_x": 1643, "pos_y": 662, "type": "Constant" }, { "id": 44, "in_ports": [0, 1, 2, 3, 4], "name": "Multiply", "out_ports": [0, 1, 2, 3, 4], "pos_x": 997, "pos_y": 954, "type": "Multiply" }, { "id": 45, "in_ports": [0, 1, 2, 3, 4], "name": "Multiply", "out_ports": [0, 1, 2, 3, 4], "pos_x": 671, "pos_y": 788, "type": "Multiply" }, { "id": 46, "in_ports": [0, 1, 2, 3, 4], "name": "Multiply", "out_ports": [0, 1, 2, 3, 4], "pos_x": 371, "pos_y": 790, "type": "Multiply" }, { "id": 47, "in_ports": [0, 1, 2, 3, 4], "name": "Multiply", "out_ports": [0, 1, 2, 3, 4], "pos_x": 1495, "pos_y": 942, "type": "Multiply" }, { "id": 48, "in_ports": [0, 1, 2, 3, 4], "name": "Multiply", "out_ports": [0, 1, 2, 3, 4], "pos_x": 303, "pos_y": 1122, "type": "Multiply" }, { "id": 59, "in_ports": [0, 1, 2, 3, 4], "name": "Add", "out_ports": [0, 1, 2, 3, 4], "pos_x": 887, "pos_y": 1180, "type": "Add" }, { "id": 60, "in_ports": [0], "name": "Output2", "out_ports": [], "pos_x": 881, "pos_y": 1266, "type": "Output" }] }
    }
  },
  methods: {
    dragIt(val) {
      sessionStorage["dragDes"] = JSON.stringify({
        drag: true,
        name: val
      });
    },
    updateDAG(data, actionName) {
      // DAG-Board更新
      this.DataAll = data
      console.log('actionName', data, actionName)
    },
    startNodesBus(e) {
      /**
       *  别的组件调用时, 先放入缓存
       * dragDes: {
       *    drag: true,
       *    name: 组件名称
       *    type: 组件类型
       *    model_id: 跟后台交互使用
       * }
       **/
      let dragDes = null;
      if (sessionStorage["dragDes"]) {
        dragDes = JSON.parse(sessionStorage["dragDes"]);
      }
      if (dragDes && dragDes.drag) {
        const x = e.pageX;
        const y = e.pageY;
        this.busValue = Object.assign({}, this.busValue, {
          pos_x: x,
          pos_y: y,
          value: dragDes.name
        });
        this.dragBus = true;
      }
    },
    moveNodesBus(e) {
      // 移动模拟节点
      if (this.dragBus) {
        const x = e.pageX;
        const y = e.pageY;
        this.busValue = Object.assign({}, this.busValue, {
          pos_x: x,
          pos_y: y
        });
      }
    },
    endNodesBus(e) {
      // 节点放入svg
      let dragDes = null;
      if (sessionStorage["dragDes"]) {
        dragDes = JSON.parse(sessionStorage["dragDes"]);
      }
      if (dragDes && dragDes.drag && e.toElement.id === "svgContent") {
        const { model_id, type } = dragDes;
        const pos_x =
          (e.offsetX - 90 - (sessionStorage["svg_left"] || 0)) /
          (sessionStorage["svgScale"] || 1); // 参数修正
        const pos_y =
          (e.offsetY - 15 - (sessionStorage["svg_top"] || 0)) /
          (sessionStorage["svgScale"] || 1); // 参数修正
        const params = {
          model_id: sessionStorage["newGraph"],
          desp: {
            type,
            pos_x,
            pos_y,
            name: this.busValue.value
          }
        };
        this.DataAll.nodes.push({
          ...params.desp,
          id: this.DataAll.nodes.length + 100,
          in_ports: [0],
          out_ports: [0]
       })
      }
      window.sessionStorage["dragDes"] = null;
      this.dragBus = false;
    }
  },
  mounted() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.headbar {
  width: 100%;
  background: black;
  color: #fff;
  position: relative;
  height: 50px;
}
.headbar p {
  position: absolute;
  left: 50px;
  background: #fff;
  color:black;
  border-radius: 15px;
  height: 30px;
  width: 140px;
  border: 1px solid #289de9;
}
.page-content {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.tapBar {
  width: 100%;
  height: 60px;
  background-color: #212528;
  display: flex;
  padding-top: 10px;
  padding-left: 300px;
}

.tapBar .title {
  color: white;
  font-weight: bold;
  font-size: 30px;
}

.tapEach {
  height: 50px;
  line-height: 50px;
  text-align: center;
  width: 100px;
  color: #ffffff;
  cursor: pointer;
}
.tapEachSel {
  height: 50px;
  line-height: 50px;
  text-align: center;
  width: 100px;
  color: #212528;
  background: #cccccc;
  cursor: pointer;
  box-sizing: border-box;
}
.mainContent {
  width: 100%;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  text-align: left;
}
.mainContent #helpContent {
  margin-top: 100px;
  text-align: left;
  text-indent: 20px;
  line-height: 20px;
}
.mainContent .nav {
  width: 300px;
  background: #212528;
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
}
.mainContent .nav div {
  color: #ffffff;
  height: 50px;
  line-height: 50px;
  width: 100%;
  text-align: center;
}
.DAG-content {
  position: absolute;
  left: 300px;
  top: 0;
  bottom: 0;
  right: 0;
}
.nodes_bus {
  user-select: none;
  text-align: center;
}
.nodes_bus span {
  display: block;
  border: 1px white solid;
  height: 50px;
  width: 200px;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-bottom: 30px;
  cursor: move;
  border-radius: 50px;
}
</style>
