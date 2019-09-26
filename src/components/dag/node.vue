<template>
  <g :transform="getNodeTransform">
    <foreignObject class="main-body">
      <body xmlns="http://www.w3.org/1999/xhtml">
        <div :class="getPanelClass">
          <span class="name">{{ nodeName }}</span>
        </div>
        <div :class="getInPortClass">
          <span class="space" @mouseup="dealMouseUp()"></span>
        </div>
        <div :class="getOutPortClass">
          <span class="space" @mousedown.prevent.stop="dealMouseDown($event.x, $event.y)"></span>
        </div>
      </body>
    </foreignObject>
  </g>
</template>

<script>
  import { DAG_EVENTS } from "@/utils/enums";

  export default {
    props: ["nodeId", "nodeName", "positionX", "positionY", "currentEvent", "focusedNodeId"],
    computed: {
      getNodeTransform() {
        return `translate(${this.positionX}, ${this.positionY})`;
      },
      getPanelClass() {
        return this.focusedNodeId === this.nodeId ? 'pane-node-content selected' : 'pane-node-content';
      },
      getInPortClass() {
        return this.currentEvent === DAG_EVENTS.DRAG_LINK ? 'in-port-hl' : 'in-port';
      },
      getOutPortClass() {
        return this.currentEvent === DAG_EVENTS.DRAG_LINK ? 'out-port-hidden' : 'out-port';
      }
    },
    methods: {
      dealMouseUp() {
        this.$emit("link-end", this.nodeId)
      },
      dealMouseDown(x, y) {
        this.$emit("link-begin", this.nodeId, x, y)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main-body {
    width: 180px;
    height: 30px;
  }
  .pane-node-content {
    box-sizing: border-box;
    width: 180px;
    height: 30px;
    background-color: hsla(0, 0%, 100%, 0.9);
    border: 1px solid #289de9;
    border-radius: 15px;
    font-size: 12px;
    transition: background-color 0.2s;
    .name {
      float: left;
      margin-left: 2px;
      width: 135px;
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
  }

  .base-port {
    position: fixed;
    height: 10px;
    width: 100%;
    display: flex;
    .space {
      width: 12px;
      height: 12px;
      margin: auto;
      border-radius: 50%;
      border: 1px solid gray;
      background: #ffffff;
    }
  }

  .in-port-hl {
    @extend .base-port;
    top: -5px;
    .space {
      cursor: crosshair;
    }
    .space:hover {
      box-shadow: 0 0 0 6px #3ddd73;
    }
  }

  .in-port {
    @extend .base-port;
    top: -4px;
    opacity: 0;
  }

  .out-port {
    @extend .base-port;
    bottom: -4px;
    opacity: 0;
    .space {
      bottom: -6px;
      cursor: crosshair;
    }
    .space:hover {
      background: #cccccc;
    }
    &:hover {
      opacity: 1;
    }
  }

  .out-port-hidden {
    @extend .base-port;
    bottom: 0;
    opacity: 0;
  }

  .selected {
    background: rgba(227, 244, 255, 0.9);
  }

  // avoid margin with <g>
  body {
    margin: 0;
  }

  // overflow visible
  foreignObject {
    overflow: visible;
  }
</style>
