<template>
  <svg
    id="svgContent"
    :style="{cursor: this.currentEvent === 'move_graph' ? 'grabbing' : 'grab'}"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    width="100%"
    height="1029"
    data-spm-anchor-id="TODO.11007039.0.i6.12b64a9bcbXQmm"
    @mousedown="svgMouseDown"
    @mousemove="dragIng($event)"
    @mouseleave="atMouseOut"
    @mouseup="dragEnd($event)"
  >
    <g :transform="` translate(${svg_left}, ${svg_top}) scale(${svgScale})`">
      <!-- 节点主体 -->
      <g
        v-for="(item, i) in DataAll.nodes"
        :key="'_' + i"
        class="svgEach"
        :transform="`translate(${item.pos_x}, ${item.pos_y})`"
        @contextmenu="r_click_nodes($event, i)"
        @dblclick="focusInput($event.path[0])"
        @mousedown="dragPre($event, i, item)"
      >
        <main-body
          :item="item"
          :i="i"
          :choice="choice"
          :currentEvent="currentEvent"
          @nodesPersonalEvent="nodesPersonalEvent"
          @changeNodeName="changeNodeName"
          @linkEnd="linkEnd"
          @linkPre="linkPre"
        />
      </g>
      <Arrow
        v-for="(each, n) in DataAll.edges"
        :key="'____' + n"
        :DataAll="DataAll"
        @delEdge="delEdge"
        :each="each"
        :index="n"
      />
      <!-- 这里演示新增arrow类型的方式 -->
      <ArrowRect
       v-for="(each, n) in DataAll.rectEdges"
        :key="'____' + n"
        :DataAll="DataAll"
        @delEdge="delEdge"
        @updateData="updateData"
        :each="each"
        :index="n"
      ></ArrowRect>
      <SimulateArrow v-if="currentEvent === 'dragLink'" :dragLink="dragLink" />
      <SimulateSelArea
        v-if="['sel_area', 'sel_area_ing'].indexOf(currentEvent) !== -1"
        :simulate_sel_area="simulate_sel_area"
      />
    </g>
    <EditArea
      @editNodeDetails="editNodeDetails"
      :isEditAreaShow="is_edit_area"
      @nodesPersonalEvent="nodesPersonalEvent"
      @delNode="delNode"
      @changePort="changePort"
      @close_click_nodes="close_click_nodes"
    />
    <Control
      @changeModelRunningStatus="changeModelRunningStatus"
      @sizeInit="sizeInit"
      @sizeExpend="sizeExpend"
      @sizeShrink="sizeShrink"
      @sel_area="sel_area"
      :modelRunningStatus="modelRunningStatus"
      :currentEvent="currentEvent"
    />
  </svg>
</template>
<script>
import Arrow from "./arrow.vue";
import ArrowRect from "./arrowRect.vue";
import SimulateArrow from "./simulateArrow.vue";
import SimulateFrame from "./simulateFrame.vue";
import EditArea from "./editArea.vue";
import Control from "./control.vue";
import SimulateSelArea from "./simulateSelArea.vue";
import mainBody from './mainBody.vue'

export default {
  name: 'DAGBoard',
  props: {
    DataAll: {
      type: Object,
      default: () => []
    }
  },

  computed: {
    svgScale () {
      return this.svg_scale || !!sessionStorage['svgScale'] ? sessionStorage['svgScale'] : 1
    }
  },
  created() {
    this.$nextTick(() => {
      this.setMouseWheelEvent()
    })
  },
  mounted() {
    sessionStorage["svg_left"] = 0;
    sessionStorage["svg_top"] = 0;
  },
  methods: {
    startActive() {
      // 激活图像状态变更
      let step = this.step
      if (step === this.historyList.length || step > this.historyList.length || !this.modelRunningStatus) return false
      this.activeGraph(step)
      if (this.nextStep) {
        clearTimeout(this.nextStep)
      }
      this.nextStep = setTimeout(() => {
        this.step++
        this.startActive()
      }, (this.historyList[step + 1].time - this.historyList[step].time) * 1000)
    },
    atMouseOut() {
      // 鼠标移出
      this.currentEvent = null
    },
    /**
     * 事件分发器
     */
    dragPre(e, i, item) {
      // 准备拖动节点
      this.multipleSelectNodes = JSON.parse(JSON.stringify(this.choice))
      if (this.multipleSelectNodes && this.multipleSelectNodes.paneNode.length) {
        this.initMultiplePosition = JSON.parse(JSON.stringify(this.DataAll.nodes))
      }
      this.setInitRect(); // 工具类 初始化dom坐标
      this.currentEvent = "dragPane"; // 修正行为
      sessionStorage['offsetX'] = e.offsetX
      sessionStorage['offsetY'] = e.offsetY
      this.choice.index = i; // 当前选择的接点
      this.timeStamp = e.timeStamp;
      this.selPaneNode(item.id);
      this.setDragFramePosition(e);
      e.preventDefault();
      e.stopPropagation();
      e.cancelBubble = true;
    },
    dragIng(e) {
      // 事件发放器 根据currentEvent来执行系列事件
      switch (this.currentEvent) {
        case 'dragPane':
          this.paneDragIng(e);
          break;
        // case 'PaneDraging':
        //    this.setDragFramePosition(e); // 触发节点拖动
        //    break;
        case 'dragLink':
          this.setDragLinkPostion(e); // 触发连线拖动
          break;
        case 'sel_area_ing':
          this.setSelAreaPostion(e); // 触发框选
          break;
        case 'move_graph':
          this.graphMoveIng(e);
          break;
        default: () => { }
      }
    },
    dragEnd(e) {
      // 拖动结束
      switch (this.currentEvent) {
        // case 'PaneDraging': this.paneDragEnd(e); // 触发节点拖动结束
        // break;
        case 'sel_area_ing': this.getSelNodes(this.simulate_sel_area);
        break;
        default: () => { }
      }
      this.currentEvent = null;
    },
    svgMouseDown(e) {
      // svg鼠标按下触发事件分发
      this.setInitRect();
      if (this.currentEvent === "sel_area") {
        this.selAreaStart(e);
      } else {
        // 那就拖动画布
        this.currentEvent = "move_graph";
        this.graphMovePre(e);
      }
    },
    /**
     * 连线系列事件
     */
    linkPre(e, i, nth) {
      // 开始连线
      this.setInitRect();
      this.currentEvent = "dragLink";
      this.choice = Object.assign({}, this.choice, { index: i, point: nth });
      this.setDragLinkPostion(e, true);
      e.preventDefault();
      e.stopPropagation();
    },

    linkEnd(i, nth) {
      // 连线结束 i, 目标点序号 nth 出发点 choice.index 出发点序号 choice.point
      if (this.currentEvent === "dragLink") {
        let params = {
          desp: {
            src_node_id: this.DataAll.nodes[this.choice.index].id,
            src_output_idx: this.choice.point,
            dst_node_id: this.DataAll.nodes[i].id,
            dst_input_idx: nth
          }
        };
        const that = this
        this.addEdge(params, that);
      }
      this.currentEvent = null;
    },
    /**
     *  svg画板缩放行为
     */
    sizeInit() {
      this.changeSize("init"); // 回归到默认倍数
      this.svg_left = 0; // 回归到默认位置
      this.svg_top = 0;
      sessionStorage["svg_left"] = 0;
      sessionStorage["svg_top"] = 0;
    },
    sizeExpend() {
      this.changeSize("expend"); // 画板放大0.1
    },
    sizeShrink() {
      this.changeSize("shrink"); // 画板缩小0.1
    },
    onMouseWheel(e) { // 鼠标滚动或mac触摸板可以改变size
        if (!e) return false
        let multiple = (e.wheelDelta / 10)
        if (this.canMouseWheelUse && (multiple * multiple) > 1) {
          multiple > 0
          ? this.sizeExpend()
          : this.sizeShrink()
          this.canMouseWheelUse = false
          setTimeout(() => { // 节流
            this.canMouseWheelUse = true
          }, 50)
        }
      },
    setMouseWheelEvent() { // 绑定鼠标滚轮事件
      const addEvent = (obj, xEvent, fn) => {
        if (obj.attachEvent) {
          obj.attachEvent('on' + xEvent, fn);
        } else {
          obj.addEventListener(xEvent, fn, false);
        }
      }

      var oDiv = document.getElementById('svgContent');
      // 当滚轮事件发生时，执行onMouseWheel这个函数
      addEvent(oDiv, 'mousewheel', this.onMouseWheel);
      addEvent(oDiv, 'DOMMouseScroll', this.onMouseWheel);
    },
    /**
     * 节点事件 单选 框选 拖动
     */
    sel_area() {
      this.currentEvent = "sel_area";
      this.simulate_sel_area = {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      };
    },
    paneDragIng(e) {
      let offsetX = sessionStorage['offsetX'] || 0
      let offsetY = sessionStorage['offsetY'] || 0
      const x =
        (e.x - this.initPos.left - (sessionStorage["svg_left"] || 0)) /
          this.svgScale - 30 - offsetX
      const y =
        (e.y - this.initPos.top - (sessionStorage["svg_top"] || 0)) /
          this.svgScale - offsetY;
      let params = {
        model_id: sessionStorage["newGraph"],
        id: this.DataAll.nodes[this.choice.index].id,
        pos_x: x,
        pos_y: y
      };
      if (this.multipleMoveNode && this.multipleSelectNodes.paneNode.length > 1) {
        this.multipleMoveNode(params)
      } else {
        this.moveNode(params);
      }
    },
    paneDragEnd(e) {
      // 节点拖动结束
      this.multipleSelectNodes = {}
      this.initMultiplePosition = null
      this.dragFrame = { dragFrame: false, posX: 0, posY: 0 };
      const x =
        (e.x - this.initPos.left - (sessionStorage["svg_left"] || 0)) /
          this.svgScale -
        90;
      const y =
        (e.y - this.initPos.top - (sessionStorage["svg_top"] || 0)) /
          this.svgScale -
        15;
      let params = {
        model_id: sessionStorage["newGraph"],
        id: this.DataAll.nodes[this.choice.index].id,
        pos_x: x,
        pos_y: y
      };
    },
    selPaneNode(id) {
      // 单选节点
      this.choice.paneNode.length = [];
      if (id) {
        this.choice.paneNode.push(id);
        this.$emit('updateDAG', this.DataAll, 'selectNode', id)
      }
    },
    selAreaStart(e) {
      // 框选节点开始
      this.currentEvent = "sel_area_ing";
      const x =
        (e.x - this.initPos.left - (sessionStorage["svg_left"] || 0)) /
        this.svgScale;
      const y =
        (e.y - this.initPos.top - (sessionStorage["svg_top"] || 0)) /
        this.svgScale;
      this.simulate_sel_area = {
        left: x,
        top: y,
        width: 0,
        height: 0
      };
    },
    setSelAreaPostion(e) {
      // 框选节点ing
      const x =
        (e.x - this.initPos.left - (sessionStorage["svg_left"] || 0)) /
        this.svgScale;
      const y =
        (e.y - this.initPos.top - (sessionStorage["svg_top"] || 0)) /
        this.svgScale;
      const width = x - this.simulate_sel_area.left;
      const height = y - this.simulate_sel_area.top;
      this.simulate_sel_area.width = width;
      this.simulate_sel_area.height = height;
    },
    getSelNodes(postions) {
      // 选取框选的节点
      const { left, top, width, height } = postions;
      this.choice.paneNode.length = 0;
      this.DataAll.nodes.forEach(item => {
        if (
          item.pos_x > left &&
          item.pos_x < left + width &&
          item.pos_y > top &&
          item.pos_y < top + height
        ) {
          // set the select nodes into this.data.choice
          this.choice.paneNode.push(item.id);
        }
      });
      this.simulate_sel_area = {
        // 触发框选结束
        left: 0,
        top: 0,
        width: 0,
        height: 0
      };
    },
    focusInput(el) { // 双击选中input
      if (el) { el.focus() }
    },
    /**
     * 画布拖动
     */
    graphMovePre(e) {
      const { x, y } = e;
      this.svg_trans_init = { x, y };
      this.svg_trans_pre = { x: this.svg_left, y: this.svg_top };
    },
    graphMoveIng(e) {
      const { x, y } = this.svg_trans_init;
      this.svg_left = e.x - x + this.svg_trans_pre.x;
      this.svg_top = e.y - y + this.svg_trans_pre.y;
      sessionStorage["svg_left"] = this.svg_left;
      sessionStorage["svg_top"] = this.svg_top;
    },
    /**
     * 模态框类
     */
    setDragFramePosition(e) {
      // 节点拖拽模态
      const x = e.x - this.initPos.left - (sessionStorage["svg_left"] || 0);
      const y = e.y - this.initPos.top - (sessionStorage["svg_top"] || 0);
      this.dragFrame = {
        posX: x / this.svgScale - 90,
        posY: y / this.svgScale - 15
      };
    },
    setDragLinkPostion(e, init) {
      // 节点连线模态
      const x =
        (e.x - this.initPos.left - (sessionStorage["svg_left"] || 0)) /
        this.svgScale;
      const y =
        (e.y - this.initPos.top - (sessionStorage["svg_top"] || 0)) /
        this.svgScale;
      if (init) {
        this.dragLink = Object.assign({}, this.dragLink, {
          fromX: x,
          fromY: y
        });
      }
      this.dragLink = Object.assign({}, this.dragLink, { toX: x, toY: y });
    },
    close_click_nodes() {
      // 关闭模态
      this.is_edit_area = { value: false, x: -9999, y: -9999 };
    },
    r_click_nodes(e, i) {
      // 节点右键模态
      this.setInitRect();
      const id = this.DataAll.nodes[i].id;
      const detail = this.DataAll.nodes[i].detail || null
      const rightClickEvent = this.DataAll.nodes[i].rightClickEvent || null
      const x = e.x - this.initPos.left;
      const y = e.y - this.initPos.top;
      this.is_edit_area = {
        value: true,
        x,
        y,
        id,
        detail,
        rightClickEvent
      };
      e.stopPropagation();
      e.cancelBubble = true;
      e.preventDefault();
    },
    /**
     * 工具类
     */
    setInitRect() {
      // 矫正svg组件坐标
      let { left, top } = document
        .getElementById("svgContent")
        .getBoundingClientRect();
      this.initPos = { left, top };
    },
    /**
     * 执行&暂停模型训练模拟
     */
    changeModelRunningStatus(status) {
      this.$emit('updateDAG', this.DataAll, 'startRunning')
    },
    /**
     * 数据层逻辑
     */
    // 模型激活
    activeGraph: ({ commit, state }, step) => {
      // const action = state.historyList[step].action
      // commit('ACTIVE_DATA', action)
    },
    // 模型暂停
    stopGraph: ({ commit, state }) => {
      // commit('STOP_DATA')
    },
    addEdge: (value, that) => {
      // 增加边
      let _DataAll = that.DataAll
      _DataAll.edges.push({
        ...value.desp,
        id: _DataAll.edges.length + 10
      })
      that.$emit('updateDAG', _DataAll, 'addEdge')
    },
    delEdge({ id }) {
      // 删除边
      console.log('id', id)
      let _edges = []
      this.DataAll.edges.forEach((item, i) => {
        if (item.id !== id) {
          _edges.push(item)
        }
      })
      this.DataAll.edges = _edges
      this.$emit('updateDAG', this.DataAll, 'delEdge')
    },
    moveNode(params) {
      // 移动点的位置
      const { id, pos_x, pos_y } = params
      let _DataAll = this.DataAll
      _DataAll.nodes.forEach((item, i) => {
        if (item.id === params.id) {
          item.pos_x = params.pos_x
          item.pos_y = params.pos_y
        }
      })
      this.$emit('updateDAG', _DataAll, 'moveNode')
    },
    multipleMoveNode(params) {
      // 同时移动多个点
      const { id, pos_x, pos_y } = params
      let x = 0
      let y = 0
      let _initMultiplePosition = this.initMultiplePosition
      let _DataAll = this.DataAll
      _initMultiplePosition.map(item => {
        if (item.id === id) {
          x = pos_x - item.pos_x
          y = pos_y - item.pos_y
        }
      })
      _initMultiplePosition.forEach(item => {
        if (this.multipleSelectNodes.paneNode.indexOf(item.id) > -1) {
          item.pos_x += x
          item.pos_y += y
        }
      })
      _DataAll.nodes = _initMultiplePosition
      this.$emit('updateDAG', _DataAll, 'moveNode')
    },
    addNode: (params) => {
      // 增加节点
      let _nodes = this.DataAll.nodes
      _nodes.push({
        ...params.desp,
        id: this.DataAll.nodes.length + 100,
        in_ports: [0],
        out_ports: [0]
      })
      this.$emit('updateDag', this.DataAll, 'addNode')
    },
    delNode({ model_id, id }) {
      // 删除节点
      let _edges = []
      let _nodes = []
      this.DataAll.edges.forEach(item => {
        if (item.dst_node_id !== id && item.src_node_id !== id) {
          _edges.push(item)
        }
      })
      this.DataAll.nodes.forEach(item => {
        if (item.id !== id) {
          _nodes.push(item)
        }
      })
      this.DataAll.edges = _edges
      this.DataAll.nodes = _nodes
      this.$emit('updateDAG', this.DataAll, 'delNode')
    },
    changeSize(action) {
      // 改变size
      let svgScale = typeof sessionStorage['svgScale'] === 'string' ? Number(sessionStorage['svgScale']) : 1
      let _width = window.innerWidth
      let _height = window.innerHeight
      switch (action) {
        case 'shrink':
          svgScale -= 0.05;
          this.svg_left = sessionStorage['svg_left'] = this.svg_left + _width * 0.01
          this.svg_top = sessionStorage['svg_top'] = this.svg_top + _height * 0.01

          break;
        case 'expend':
          svgScale += 0.05;
          this.svg_top = sessionStorage['svg_top'] = this.svg_top - _height * 0.01
          this.svg_left = sessionStorage['svg_left'] = this.svg_left - _width * 0.01
          break;
        case 'init':
          svgScale = 1
          break;
        default: () => ''
      }
      this.svg_scale = sessionStorage['svgScale'] = svgScale
    },
    changeNodeName(params) {
      // 改变节点名称
      this.DataAll.nodes.forEach(item => {
        if (item.id === params.id) {
          item.name = params.name
        }
      })
      this.$emit('updateDAG', this.DataAll, 'changeNodeName')
    },
    changePort(action, id) {
      this.DataAll.nodes.forEach(item => {
        if (item.id === id) {
          item[action] ? item[action].push(item[action].length) : item[action] = ['0']
        }
      })
      this.$emit('updateDAG', this.DataAll, 'changePort')
    },
    updateData(DataAll, name) {
      this.$emit('updateDAG', DataAll, name)
    },
    editNodeDetails(value) {
      // 抛出待编辑内容
      this.$emit('editNodeDetails', value)
    },
    nodesPersonalEvent(eventName, id) {
      this.$emit('doSthPersonal', eventName, id)
    }
  },
  data() {
    return {
      svg_scale: null,
      choice: {
        paneNode: [], // 选取的节点下标组
        index: -1,
        point: -1 // 选取的点数的下标
      },
      dragFrame: {
        // 节点模态
        posX: 9999,
        posY: 9999
      },
      dragLink: {
        // 连线模态
        fromX: 0,
        fromY: 0,
        toX: 0,
        toY: 0
      },
      currentEvent: null, // 当前执行的方法
      initPos: {
        // 初始化svg dom位置
        left: -1,
        top: -1
      },
      timeStamp: "",
      is_edit_area: {
        value: false,
        x: -9999,
        y: -9999
      }, // 是否在编辑节点
      simulate_sel_area: {
        // 框选节点
        left: 10,
        top: 50,
        width: 0,
        height: 0
      },
      svg_left: 0,
      svg_top: 0,
      svg_trans_init: {
        x: 0,
        y: 0
      },
      canMouseWheelUse: true,
      step: 0, // 模型训练计步
      modelRunningStatus: false,
      nextStep: null,
      multipleSelectNodes: {},
      initMultiplePosition: {}
    };
  },
  components: {
    Arrow,
    ArrowRect,
    SimulateArrow,
    SimulateFrame,
    EditArea,
    Control,
    SimulateSelArea,
    mainBody
  }
};
</script>

<style  scoped>
.svgEach {
  position: relative;
}

.connector {
  stroke: hsla(0, 0%, 50%, 0.6);
  stroke-width: 2px;
  fill: none;
}
.simulate_sel_area {
  border: 3px dashed blue;
  position: absolute;
}
</style>
