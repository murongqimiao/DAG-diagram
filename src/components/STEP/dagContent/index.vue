<template>
  <svg
     id="svgContent"
     :style="{cursor: this.currentEvent === 'move_graph' ? 'grabbing' : 'grab'}"
     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="1260" height="1029" data-spm-anchor-id="TODO.11007039.0.i6.12b64a9bcbXQmm"
    @mousedown="svgMouseDown"
    @mousemove="dragIng($event)"
    @mouseup="dragEnd($event)">
    <g :transform="` translate(${svg_left}, ${svg_top}) scale(${svgScale})`" >
          <g
          v-for="(item, i) in DataAll.nodes"
          :key="'_' + i" class="svgEach"
          :transform="`translate(${item.pos_x}, ${item.pos_y})`"
          @contextmenu="r_click_nodes($event, i)"
          @dblclick="focusInput($event.path[0])"
          @mousedown="dragPre($event, i, item)">
              <foreignObject width="180" height="30" >
              <body xmlns="http://www.w3.org/1999/xhtml" style="margin: 0" >
              <div>
                <div :class="choice.paneNode.indexOf(item.id) !== -1 ? 'pane-node-content selected' : 'pane-node-content'">
                    <span class="icon icon-data"></span>
                    <input type="text" class="name"  v-model="item.name">
                    <!-- <span class="name">{{item.name}}</span> -->
                </div>
                <div :class="currentEvent === 'dragLink' ? 'pane-node-parent-hl' : 'pane-node-parent' ">
                  <div v-for="(poi, nth) in item.in_ports" :key="'__' + nth" :style="{width: `${ 100 / (item.in_ports.length + 1)}%`}">
                    <span class="space" @mouseup="linkEnd(i, nth)"></span>
                  </div>
                </div>
                <div class="pane-node-children">
                  <div v-for="(poi, nth) in item.out_ports" :key="'___' + nth" :style="{width: `${ 100 / (item.out_ports.length + 1)}%`}">
                    <span class="space" @mousedown="linkPre($event, i, nth)"></span>
                  </div>
                </div>
              </div>
              </body>
            </foreignObject>
          </g>
          <SimulateFrame  v-if="currentEvent === 'PaneDraging'" :dragFrame="dragFrame" />
          <Arrow v-for="(each, n) in DataAll.edges" :key="'____' + n" :DataAll="DataAll" :each="each" :index="n" />
          <SimulateArrow v-if="currentEvent === 'dragLink'" :dragLink="dragLink"/>
          <EditArea :isEditAreaShow="is_edit_area" @close_click_nodes="close_click_nodes"/>
          <SimulateSelArea v-if="['sel_area', 'sel_area_ing'].indexOf(currentEvent) !== -1" :simulate_sel_area="simulate_sel_area" />
      </g>
      <Control @sizeInit="sizeInit" @sizeExpend="sizeExpend" @sizeShrink="sizeShrink"  @sel_area="sel_area" :currentEvent="currentEvent" />
    </svg>
</template>
<script>
import Arrow from "./arrow.vue";
import SimulateArrow from "./simulateArrow.vue";
import SimulateFrame from "./simulateFrame.vue";
import EditArea from "./editArea.vue";
import { mapState, mapActions } from "vuex";
import Control from "./control.vue";
import SimulateSelArea from "./simulateSelArea.vue";

export default {
  props: {
    model_id: {
      // 入参model_id 如果此入参存在,则认为是打开已保存的模型
      type: String,
      default: null
    },
    template: {
      // 入参template 如果model_id不存在, 则会新建一个此类型的模型.
      type: String,
      default: "default"
    }
  },
  computed: mapState({
    DataAll: state => state.dagStore.DataAll,
    svgScale: state => state.dagStore.svgSize
  }),
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
    ...mapActions([
      "openGraph",
      "newGraph",
      "addEdge",
      "delEdge",
      "addNode",
      "delNode",
      "showGraph",
      "saveGraph",
      "moveNode",
      "changeSize"
    ]),
    /**
     * 事件分发器
     */
    dragPre(e, i, item) {
      // 准备拖动节点
      this.setInitRect(); // 工具类 初始化dom坐标
      this.currentEvent = "dragPane"; // 修正行为
      this.choice.index = i;
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
          if (e.timeStamp - this.timeStamp > 200) {
            this.currentEvent = "PaneDraging"; // 确认是拖动节点
          };
          break;
        case 'PaneDraging':
           this.setDragFramePosition(e); // 触发节点拖动
           break;
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
        case 'PaneDraging': this.paneDragEnd(e); // 触发节点拖动结束
        break;
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
          model_id: sessionStorage["newGraph"],
          desp: {
            src_node_id: this.DataAll.nodes[this.choice.index].id,
            src_output_idx: this.choice.point,
            dst_node_id: this.DataAll.nodes[i].id,
            dst_input_idx: nth
          }
        };
        this.addEdge(params);
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
    paneDragEnd(e) {
      // 节点拖动结束
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
      this.moveNode(params);
    },
    selPaneNode(id) {
      // 单选节点
      this.choice.paneNode.length = [];
      if (id) {
        this.choice.paneNode.push(id);
      }
      console.log("目前选择的节点是", this.choice.paneNode);
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
      console.log("position", this.DataAll);
      const { left, top, width, height } = postions;
      this.choice.paneNode.length = 0;
      this.DataAll.nodes.forEach(item => {
        if (
          item.pos_x > left &&
          item.pos_x < left + width &&
          item.pos_y > top &&
          item.pos_y < top + height
        ) {
          this.choice.paneNode.push(item.id);
        }
      });
      console.log("目前选择的节点是", this.choice.paneNode);
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
      const x =
        (e.x - this.initPos.left - (sessionStorage["svg_left"] || 0)) /
        this.svgScale;
      const y =
        (e.y - this.initPos.top - (sessionStorage["svg_top"] || 0)) /
        this.svgScale;
      this.is_edit_area = {
        value: true,
        x,
        y,
        id
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
    }
  },
  data() {
    return {
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
      canMouseWheelUse: true
    };
  },
  components: {
    Arrow,
    SimulateArrow,
    SimulateFrame,
    EditArea,
    Control,
    SimulateSelArea
  }
};
</script>

<style lang="scss" scoped>
.svgEach {
  position: relative;
}
.pane-node-content {
  box-sizing: border-box;
  width: 180px;
  height: 30px;
  background-color: hsla(0, 0%, 100%, 0.9);
  border: 1px solid #289de9;
  border-radius: 15px;
  font-size: 12px;
  -webkit-transition: background-color 0.2s;
  transition: background-color 0.2s;
  .icon {
    width: 26px;
    height: 26px;
    margin: 1px;
    border-radius: 100%;
    float: left;
    color: #fff;
    font-size: 16px;
    background-color: #289de9;
    cursor: pointer;
  }
  .name {
    float: left;
    margin-left: 2px;
    width: 135px;
    // height: 28px;
    line-height: 28px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    height: 26px;
    background: transparent;
    border: none;
  }
  .parentLink {
    font-size: 0;
    height: 12px;
    width: 12px;
    position: absolute;
    top: 0;
    left: 90px;
    transform: translateX(-50%);
    border-top: 6px solid black;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }
  .childLink {
    height: 10px;
    width: 10px;
    position: absolute;
    bottom: 0;
    left: 90px;
    transform: translate(-50%, 50%);
    border-radius: 50%;
    background: #ffffff;
    cursor: crosshair;
  }
}
.pane-node-parent-hl {
  position: fixed;
  top: -5px;
  height: 10px;
  width: 100%;
  display: flex;
  transform: translateX(6px);
  .space {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid gray;
    background: #ffffff;
    position: absolute;
    right: 0;
    top: 0;
    cursor: crosshair;
  }
  .space:hover {
    box-shadow: 0 0 0 6px #3ddd73;
  }
}
.pane-node-parent-hl > div {
  position: relative;
  display: inline-block;
}

.pane-node-parent {
  position: fixed;
  top: -5px;
  height: 10px;
  width: 100%;
  display: flex;
  opacity: 0;
  transform: translateX(6px);
  .space {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid gray;
    background: #ffffff;
    position: absolute;
    right: 0;
    top: 0;
  }
}

.pane-node-parent > div {
  position: relative;
  display: inline-block;
}

.pane-node-children {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  opacity: 0;
  transform: translateX(6px);
  .space {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid gray;
    background: #ffffff;
    position: absolute;
    right: 0px;
    bottom: -6px;
    cursor: crosshair;
  }
  .space:hover {
    background: #cccccc;
  }
}
.pane-node-children:hover {
  opacity: 1;
}

.pane-node-children > div {
  position: relative;
  display: inline-block;
}

.selected {
  background: rgba(227, 244, 255, 0.9) !important;
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
