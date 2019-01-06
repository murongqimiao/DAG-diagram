<template>
  <svg
  @mousedown="svgMouseDown"
  @mousemove="dragIng($event)"
  @mouseup="dragEnd($event)"
  id="svgContent"
  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="1260" height="1029" data-spm-anchor-id="TODO.11007039.0.i6.12b64a9bcbXQmm">
        <g
        v-for="(item, i) in DataAll.nodes"
        :key="'_' + i" class="svgEach"
        :transform="`translate(${item.pos_x}, ${item.pos_y})`"
        @mousedown="dragPre($event, i)">
            <foreignObject width="180" height="30">
            <body xmlns="http://www.w3.org/1999/xhtml" style="margin: 0">
              <div :class="choice.paneNode === i ? 'pane-node-content selected' : 'pane-node-content'">
                  <span class="icon icon-data"></span>
                  <span class="name">{{item.name}}</span>
              </div>
              <div :class="currentEvent === 'dragLink' ? 'pane-node-parent-hl' : 'pane-node-parent' ">
                <div v-for="(poi, nth) in item.in_ports" :key="nth" :style="{width: `${ 100 / (item.in_ports.length + 1)}%`}">
                  <span class="space" @mouseup="linkEnd(i, nth)"></span>
                </div>
              </div>
              <div class="pane-node-children">
                <div v-for="(poi, nth) in item.out_ports" :key="nth" :style="{width: `${ 100 / (item.out_ports.length + 1)}%`}">
                  <span class="space" @mousedown="linkPre($event, i, nth)"></span>
                </div>
              </div>
            </body>
          </foreignObject>
        </g>
        <SimulateFrame  v-if="currentEvent === 'PaneDraging'" :dragFrame="dragFrame" />
        <Arrow v-for="(each, n) in DataAll.edges" :key="n" :DataAll="DataAll" :each="each" :index="n" />
        <SimulateArrow v-if="currentEvent === 'dragLink'" :dragLink="dragLink"/>
    </svg>
</template>
<script>
import DataAll from "./SVG_Data.js";
import Arrow from "./arrow.vue";
import SimulateArrow from "./simulateArrow.vue";
import SimulateFrame from "./simulateFrame.vue";

export default {
  methods: {
    selPaneNode(i) {
      // 选取节点
      this.choice.paneNode = this.choice.paneNode === i ? -1 : i;
    },
    setInitRect() {
      let { left, top } = document
        .getElementById("svgContent")
        .getBoundingClientRect();
      this.initPos = { left, top }; // 修正坐标
    },
    dragPre(e, i) {
      // 准备拖动节点
      this.setInitRect();
      this.currentEvent = "dragPane"; // 修正行为
      this.choice.index = i;
      this.timeStamp = e.timeStamp;
      this.selPaneNode(i);
      this.setDragFramePosition(e);
    },
    linkPre(e, i, nth) {
      this.setInitRect();
      this.currentEvent = "dragLink";
      this.choice = Object.assign({}, this.choice, { index: i, point: nth });
      this.setDragLinkPostion(e, true);
      e.preventDefault();
      e.stopPropagation();
    },
    dragIng(e) {
      if (
        this.currentEvent === "dragPane" &&
        e.timeStamp - this.timeStamp > 200
      ) {
        this.currentEvent = "PaneDraging";
      }
      if (this.currentEvent === "PaneDraging") {
        this.setDragFramePosition(e);
      }
      if (this.currentEvent === "dragLink") {
        this.setDragLinkPostion(e);
      }
    },
    dragEnd(e) {
      // 拖动结束
      if (this.currentEvent === "PaneDraging") {
        this.dragFrame = { dragFrame: false, posX: 0, posY: 0 };
        if (e.timeStamp - this.timeStamp > 200) {
          this.setPanePosition(e);
        }
      }
      this.currentEvent = null;
    },
    linkEnd(i, nth) {
      // 目标序列 i, 目标点序号 nth 出发点 choice.index 出发点序号 choice.point
      if (this.currentEvent === "dragLink") {
        this.DataAll.edges.push({
          dst_node_id: this.DataAll.nodes[this.choice.index].id,
          dst_input_idx: this.choice.point,
          src_node_id: this.DataAll.nodes[i].id,
          src_output_idx: nth
        });
        this.DataAll = JSON.parse(JSON.stringify(this.DataAll));
      }
      this.currentEvent = null;
    },
    setDragFramePosition(e) {
      const x = e.x - this.initPos.left;
      const y = e.y - this.initPos.top;
      this.dragFrame = { posX: x - 90, posY: y - 15 };
    },
    setDragLinkPostion(e, init) {
      // 定位连线
      const x = e.x - this.initPos.left;
      const y = e.y - this.initPos.top;
      if (init) {
        this.dragLink = Object.assign({}, this.dragLink, {
          fromX: x,
          fromY: y
        });
      }
      this.dragLink = Object.assign({}, this.dragLink, { toX: x, toY: y });
    },
    setPanePosition(e) {
      const x = e.x - this.initPos.left - 90;
      const y = e.y - this.initPos.top - 15;
      const i = this.choice.index;
      this.DataAll.nodes[i] = Object.assign({}, this.DataAll.nodes[i], {
        pos_x: x,
        pos_y: y
      });
      this.DataAll = JSON.parse(JSON.stringify(this.DataAll));
    },
    svgMouseDown() {
      // this.selPaneNode(-1); // 关闭选取节点
    }
  },
  data() {
    return {
      DataAll: DataAll,
      choice: {
        paneNode: -1, // 选取的节点下标
        index: -1,
        point: -1 // 选取的点数的下标
      },
      dragFrame: {
        posX: 9999,
        posY: 9999
      },
      dragLink: {
        fromX: 0,
        fromY: 0,
        toX: 0,
        toY: 0
      },
      currentEvent: null, // 当前执行的方法
      initPos: {
        left: -1,
        top: -1
      },
      timeStamp: ""
    };
  },
  components: {
    Arrow,
    SimulateArrow,
    SimulateFrame
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
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
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
    cursor: crosshair;
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
</style>
