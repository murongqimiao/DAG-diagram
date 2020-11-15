<!-- 纯净版示范 -->
<template>
  <!-- 最外层容器监mouse系列事件, 用来做节点拖拽 -->
  <div
    class="diagramExample"
    @mousedown="startNodesBus($event)"
    @mousemove="moveNodesBus($event)"
    @mouseup="endNodesBus($event)"
  >
    <!-- 左侧导航 -->
    <div class="page-left">
      <div class="logo">DAG-Board</div>
      <div
        class="basic-node"
        v-for="(item, i) in initNodesBasic"
        :key="'nodes_basic' + i"
        @mousedown="dragIt(item)"
      >
        {{ item.name }}
      </div>
    </div>

    <!-- 顶栏 -->
    <div class="headbar">顶栏可以放一些button, 比如发布模型, 保存模型等</div>

    <!-- 右侧表单 -->
    <div class="right-form">
      <div class="title">这里是编辑区域, 选中节点进行编辑</div>
      <el-form
        v-if="formDetail.currentEditNodeId"
        ref="form"
        :model="formDetail.form"
        label-width="80px"
      >
        <el-form-item label="节点描述">
          <el-input v-model="formDetail.form.details"></el-input>
        </el-form-item>
        <el-form-item label="生成时间">
          <el-input v-model="formDetail.form.createTime"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存变更</el-button>
        </el-form-item>
      </el-form>

      <el-form ref="autoLayout" :model="formDetail.layout" label-width="80px">
        <div class="title">前端自动布局体验</div>
        <el-form-item label="节点数量">
          <el-input type="number" v-model="formDetail.form.nodes"></el-input>
        </el-form-item>
        <el-form-item label="连线数量">
          <el-input type="number" v-model="formDetail.form.sides"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="generate">生成新图</el-button>
          <el-button type="primary" @click="autoLayout">自动布局</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- DAG-Diagram主体 -->
    <DAGBoard
      ref="DAGBoard"
      :DataAll="yourJSONDataFillThere"
      @updateDAG="updateDAG"
      @editNodeDetails="editNodeDetails"
      @doSthPersonal="doSthPersonal"
    ></DAGBoard>

    <!-- 用来模拟拖拽添加的元素 -->
    <node-bus
      v-if="dragBus"
      :value="busValue.value"
      :pos_x="busValue.pos_x"
      :pos_y="busValue.pos_y"
    />
  </div>
</template>

<script>
import { diagramExampleData, JSONFromService, nodesBasic } from './data.js'

export default {
  components: {},
  props: {},
  data () {
    return {
      data: this.diagramExampleData,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      initNodesBasic: nodesBasic,
      // 以下为svg必要内容
      dragBus: false, // 是否在拖拽,
      yourJSONDataFillThere: { // 用来展示的节点与连线
        nodes: [],
        sides: []
      },
      // 以下为拖拽方式添加节点必须内容
      busValue: {
        value: "name",
        pos_x: 100,
        pos_y: 100
      },
      // 以下为表单展示数据
      formDetail: {
        currentEditNodeId: null,
        form: {
          sides: 100,
          nodes: 100
        }
      },
      // 监听的事件
      onkeydown: null,
      // 复制的内容
      copyContent: []
    }
  },
  created () {
    this.loadJSON()
    this.onkeydown = document.addEventListener('keydown', e => {
      if (e.ctrlKey && e.key === 'c') {
        // 按下ctrl + c
        this.ctrlC()
      } else if (e.ctrlKey && e.key === 'v') {
        // 按下ctrl + v
        this.ctrlV()
      }
    })
  },
  mounted () {
  },
  beforeDestroy () {
    this.onkeydown = null // 销毁事件
  },
  methods: {
    generate () { // 生成随机图
      const nodesNumber = this.formDetail.form.nodes || 100; // 节点数量
      const sidesNumber = this.formDetail.form.sides || 100; // 边的数量
      const GRAPH_WIDTH = (nodesNumber > 100 ? nodesNumber : 100) * 10; // 图的宽度
      const GRAPH_HEIGHT = (nodesNumber > 100 ? nodesNumber : 100) * 10; // 图的高度
      const newGraphNodes = [];
      const newGraphSides = [];
      this.yourJSONDataFillThere = {
        nodes: [],
        edges: []
      }
      // step1 生成节点
      const generatePosition = () => { // 生成坐标
        const PosX = (Math.random() * GRAPH_WIDTH).toFixed();
        const PosY = (Math.random() * GRAPH_HEIGHT).toFixed();
        return {
          pos_x: Number(PosX),
          pos_y: Number(PosY)
        }
      }
      for (let nodeIndex = 0; nodeIndex < nodesNumber; nodeIndex++) {
        const eachGraphNode = {
          "id": nodeIndex + 1,
          "in_ports": [0],
          "name": `NODE_${nodeIndex}`,
          "out_ports": [0],
          "detail": [],
          ...generatePosition()
        }
        newGraphNodes.push(eachGraphNode);
      }
      this.yourJSONDataFillThere.nodes = newGraphNodes
      // step2 生成边 因为id是有序的,所以这里id范围根据节点生成
      const generateNodeEntry = (nodesMax) => { return (Math.random() * nodesMax).toFixed(); }
      for (let sideIndex = 0; sideIndex < sidesNumber; sideIndex++) {
        const eachSide = {
          "dst_input_idx": 0,
          "dst_node_id": Number(generateNodeEntry(nodesNumber)) || 1,
          "id": sideIndex + 1,
          "src_node_id": Number(generateNodeEntry(nodesNumber)) || 1,
          "src_output_idx": 0,
          "edgesText": ""
        }
        if (eachSide.dst_node_id !== eachSide.src_node_id) {
          newGraphSides.push(eachSide);
        }
      }
      this.yourJSONDataFillThere.edges = newGraphSides
      console.log(JSON.stringify(this.yourJSONDataFillThere, null, 4))
    },
    autoLayout () { // 自动布局
      const allSidesArr = this.yourJSONDataFillThere.edges.map(i => [i.src_node_id, i.dst_node_id]); // [[1,2], [2,3]]
      const connectTest = (a, b) => { // 测试关联 [1, 2], [2, 3]
        if (a[0] === b[1] || b[0] === a[1] || a[0] === b[0] || a[1] === b[1]) {
          return true
        } else {
          return false
        }
      }
      let arrSeparate = [[allSidesArr.shift()]];
      const testArr = (allSidesArr) => { // 递归检测连线的关系,把有关联的连线放在一起
        for (let i = 0; i < arrSeparate[arrSeparate.length - 1].length; i++) {
          for (let j = 0; j < allSidesArr.length; j++) {
            if (connectTest(arrSeparate[arrSeparate.length - 1][i], allSidesArr[j])) { // 建立关联,放入分组
              arrSeparate[arrSeparate.length - 1] = arrSeparate[arrSeparate.length - 1].concat(allSidesArr.splice(j, 1));
              testArr(allSidesArr) // 递归
              return false;
            }
          }
        }
        // 循环完毕仍然有数据的话, 放入第二个数组
        if (allSidesArr.length) {
          arrSeparate.push(allSidesArr.shift());
          testArr(allSidesArr);
        }
      }
      testArr(allSidesArr)
      console.log("整理好的数据", arrSeparate)
      // while (arrSeparate.length) { // 递归画所有的关系图
      //   this.drawSingleGraph(arrSeparate.shift());
      // }
      this.drawSingleGraph(arrSeparate.shift()); // 先画一个
    },
    unique (arr) { // 数组去重
      return Array.from(new Set(arr))
    },
    drawSingleGraph (graphArr) {
      const left = graphArr.map(v => v[0]); // 出口集合
      const right = graphArr.map(v => v[1]); // 入口集合
      const result = [[]];
      // 寻找最上层节点 只有出口没有入口的都是顶点
      result[0] = left.filter(v => right.indexOf(v) === -1);
      // 没有上类节点的图证明成环,放弃渲染 有顶点才会渲染
      let recursionArr = graphArr // 全部数组  [[1,2], [2,3], [3,4]]...
      if (result[0].length) {
        result[0] = this.unique(result[0]);
        while (recursionArr.length) { // 剩余连线存在就一直递归
          // recursionArr = graphArr.filter(eachArr => result[0].indexOf(eachArr[0]) === -1); // 更新剩余的边
          let nextLevelNodesArr = []
          result[result.length - 1].map(sourceFromId => { // 当前循环到的层级
            recursionArr.map(eachArr => {
              if (result[result.length - 1].indexOf(eachArr[0]) > -1) { // 检测到入口对应的边,把出口id放入数组下一级
                 nextLevelNodesArr.push(eachArr[1])
              }
            })
          })
          recursionArr = recursionArr.filter(eachArr => result[result.length - 1].indexOf(eachArr[0]) === -1)// 更新剩余的边
          if (nextLevelNodesArr.length) {
            nextLevelNodesArr = this.unique(nextLevelNodesArr);
            result[result.length] = nextLevelNodesArr
          }
        }
      }
      debugger
      this.draw(result);
    },
    draw(nodesIdArr) {
      const newNodesJSON = [];
      const CANVAS_WIDTH = 1440;
      const EACH_LEVEL_HIGH = 300;
      this.yourJSONDataFillThere.nodes.map(v => {
        v.pos_x = -1000;
        v.pox_y = 0;
      })
      nodesIdArr.forEach((row, rowIndex) => {
        row.map((curId, curIndex) => {
          const aim = this.yourJSONDataFillThere.nodes.find(v => v.id === curId);
          aim.pos_x = (CANVAS_WIDTH / row.length + 1) * (curIndex + 1);
          aim.pos_y = EACH_LEVEL_HIGH * (rowIndex + 1);
        })
      })
    },
    ctrlC () {
      let currentChoice = this.$refs.DAGBoard.choice
      if (currentChoice.index > -1) { // 有选中元素
        let activeNodes = this.yourJSONDataFillThere.nodes.filter(item => currentChoice.paneNode.indexOf(item.id) > -1)
        this.copyContent = JSON.parse(JSON.stringify(activeNodes))
        this.copyContent.forEach(item => {
          item.id = item.id + this.yourJSONDataFillThere.nodes.length + 100 // 自定义id规范 这里随便写个长度+100作为id
          item.pos_x += (100 / (sessionStorage['svgScale'] || 1))
          item.pos_y += (100 / (sessionStorage['svgScale'] || 1))
        })
      }
    },
    ctrlV () {
      if (!this.copyContent.length) return false
      this.yourJSONDataFillThere.nodes.push(...this.copyContent)
      this.$refs.DAGBoard.choice = {
        paneNode: [], // 选取的节点下标组
        index: -1,
        point: -1
      }// 复制完成 取消选中状态
      this.copyContent = []
    },
    updateDAG (data, action, id) {
      console.log(...arguments)
      console.log(JSON.stringify(arguments[0]))
      switch (action) {
        case 'selectNode':
          this.showNodeDetails(data.nodes.find(item => item.id === id))
          break;
        default: () => { }
      }
    },
    editNodeDetails () {
      console.log(...arguments)
    },
    doSthPersonal () {
      console.log(...arguments)
    },
    loadJSON () {
      // 这里可以跟服务端交互获取数据
      setTimeout(() => {
        this.yourJSONDataFillThere = JSONFromService
      }, 500);
    },
    /**
     * 通过拖拽方式加入新节点必须的函数
     */
    startNodesBus (e) {
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
    moveNodesBus (e) {
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
    endNodesBus (e) {
      // 节点放入svg
      let dragDes = null;
      if (sessionStorage["dragDes"]) {
        dragDes = JSON.parse(sessionStorage["dragDes"]);
      }
      if (dragDes && dragDes.drag && e.toElement.id === "svgContent") {
        const pos_x =
          (e.offsetX - 90 - (sessionStorage["svg_left"] || 0)) /
          (sessionStorage["svgScale"] || 1); // 参数修正
        const pos_y =
          (e.offsetY - 15 - (sessionStorage["svg_top"] || 0)) /
          (sessionStorage["svgScale"] || 1); // 参数修正
        delete dragDes.drag
        const params = {
          model_id: sessionStorage["newGraph"],
          desp: {
            pos_x,
            pos_y,
            name: this.busValue.value,
            ...dragDes
          }
        };
        this.yourJSONDataFillThere.nodes.push({
          ...params.desp,
          id: this.yourJSONDataFillThere.nodes.length + 100, // 这里注意, 新增的id一定不能重复, 建议id交由后端处理
          in_ports: [0],
          out_ports: [0]
        })
      }
      window.sessionStorage["dragDes"] = null;
      this.dragBus = false;
    },
    dragIt (val) {
      val.form.createTime = new Date().toDateString()
      sessionStorage["dragDes"] = JSON.stringify({
        drag: true,
        ...val
      });
    },
    /**
     * 右侧form展示逻辑
     */
    showNodeDetails (val) { // 展示选中的节点
      const { id, form } = val
      if (!form) return
      this.formDetail = {
        currentEditNodeId: id,
        form: Object.assign(this.formDetail.form, form, {})
      }
    },
    onSubmit () { // 更新所选节点的信息
      const { currentEditNodeId, form } = this.formDetail
      this.yourJSONDataFillThere.nodes.map(item => {
        if (item.id === currentEditNodeId) {
          item.form = form
        }
      })
      let _data = this.yourJSONDataFillThere.nodes.find(item => item.id === currentEditNodeId).form
      let str = JSON.stringify(_data, null, 4)
      alert('节点信息更新完成' + str)
    }
  }
}
</script>

<style lang="scss" scoped>
.diagramExample {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  .basic-node {
    margin-top: 5px;
    background: #fff;
    color: black;
    border-radius: 15px;
    height: 30px;
    width: 140px;
    border: 1px solid #289de9;
    line-height: 30px;
    display: inline-block;
    cursor: pointer;
    user-select: none;
  }
  .page-left {
    position: absolute;
    left: 0;
    top: 0;
    width: 200px;
    height: 100vh;
    background: #717171;
    .logo {
      font-size: 20px;
      line-height: 40px;
      font-weight: bold;
      border-bottom: 1px solid #ccc;
      background: #fff;
    }
  }
  .headbar {
    position: absolute;
    top: 0;
    left: 200px;
    right: 0;
    line-height: 40px;
    text-align: left;
    text-indent: 20px;
    user-select: none;
  }
  .right-form {
    width: 400px;
    position: absolute;
    right: 0;
    top: 0;
    height: 100vh;
    border-left: 1px solid #ccc;
    background: #fff;
    .title {
      font-size: 20px;
      line-height: 80px;
    }
  }
}
/** 给svg添加格子背景 */
#svgContent {
  background-size: 50px 50px;
  background-image: linear-gradient(
      0deg,
      transparent 24%,
      rgba(255, 255, 255, 0.05) 25%,
      rgba(255, 255, 255, 0.05) 26%,
      transparent 27%,
      transparent 74%,
      rgba(255, 255, 255, 0.05) 75%,
      rgba(255, 255, 255, 0.05) 76%,
      transparent 77%,
      transparent
    ),
    linear-gradient(
      90deg,
      transparent 24%,
      rgba(255, 255, 255, 0.05) 25%,
      rgba(255, 255, 255, 0.05) 26%,
      transparent 27%,
      transparent 74%,
      rgba(255, 255, 255, 0.05) 75%,
      rgba(255, 255, 255, 0.05) 76%,
      transparent 77%,
      transparent
    );
  background-color: rgb(60, 60, 60) !important;
  margin-left: 200px;
  margin-top: 40px;
  margin-right: 200px;
}
</style>
