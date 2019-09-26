<!-- The svg id shall never change, some logic is based on svg id -->
<template>
  <svg
    id="svgContent"
    :style="getSvgStyle"
    xmlns="http://www.w3.org/2000/svg" version="1.1"
    @mousedown="svgMouseDown"
    @mousemove="dragging($event.timeStamp, $event.x, $event.y)"
    @mouseleave="onMouseOut"
    @mouseup="dragEnd($event.x, $event.y)"
    @mousewheel="onMouseWheel($event.wheelDelta)"
    @contextmenu.prevent="rClickSvg">
    <g :transform="getMainPanelTransform">
      <Node v-for="each in DataAll.nodes" :key="each.id" :nodeId="each.id" :nodeName="each.name"
            :positionX="each.pos_x" :positionY="each.pos_y"
            :currentEvent="currentEvent" :focusedNodeId="focused_node_id"
            @contextmenu.native.prevent.stop="r_click_node($event.x, $event.y, each.id)"
            @mousedown.native.prevent.stop="dragPre($event.timeStamp, $event.x, $event.y, each.id)"
            @link-begin="linkBegin"
            @link-end="linkEnd" />
      <SimulateArrow v-if="isShowSimulateArrow" :dragLink="dragLink" />
      <Arrow v-for="each in DataAll.edges" :key="each.id" :arrowId="each.id"
             :srcNodeId="each.src_node_id"
             :dstNodeId="each.dst_node_id"
             @contextmenu.native.prevent.stop="r_click_arrow($event.x, $event.y, each.id)" />
      <SimulateNode v-if="isShowSimulateNode" :dragNode="dragNode" />
    </g>
    <NodeMenu :nodeMenuData="node_menu_data" @close-node-menu="close_node_menu" />
    <ArrowMenu :arrowMenuData="arrow_menu_data" @close-arrow-menu="close_arrow_menu" />
  </svg>
</template>

<script>
import Arrow from "./arrow.vue";
import Node from "./node.vue";
import SimulateArrow from "./simulateArrow.vue";
import SimulateNode from "./simulateNode.vue";
import NodeMenu from "./nodeMenu.vue";
import ArrowMenu from "./arrowMenu.vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { DAG_EVENTS, SIZE_CHANGE_TYPE } from "@/utils/enums";

export default {
  computed: {
    ...mapState({
      DataAll: state => state.dagStore.DataAll,
      svgScale: state => state.dagStore.svgSize,
      svgCoordinate: state => state.dagStore.svgCoordinate
    }),
    ...mapGetters(["getSvgPosition"]),
    getMainPanelTransform() {
      return `translate(${this.svgCoordinate.offset_x}, ${this.svgCoordinate.offset_y}) scale(${this.svgScale})`;
    },
    getSvgStyle() {
      return {
        width: "100%",
        height: "1080px",
        cursor: this.currentEvent === DAG_EVENTS.MOVE_GRAPH ? 'grabbing' : 'grab'
      };
    },
    isShowSimulateNode() {
      return this.currentEvent === DAG_EVENTS.MOVE_NODE;
    },
    isShowSimulateArrow() {
      return this.currentEvent === DAG_EVENTS.DRAG_LINK;
    }
  },
  created() {
  },
  mounted() {
    this.openGraph();
    this.updateLayout();
  },
  methods: {
    ...mapMutations([
      "addEdge",
      "moveNode",
      "changeSvgOffset",
      "openGraph",
      "updateLayout"
    ]),
    ...mapActions([
      "changeSize"
    ]),
    onMouseOut() {
      this.currentEvent = null;
    },
    rClickSvg() {
      this.currentEvent = null;
    },
    getNodePos(node_id) {
      let node = this.DataAll.nodes.find(item => {
        return item.id === node_id;
      });
      return {
        pos_x: node.pos_x,
        pos_y: node.pos_y
      }
    },

    dragPre(timestamp, e_x, e_y, nodeId) {
      this.currentEvent = DAG_EVENTS.PRE_MOVE_NODE;
      this.focused_node_id = nodeId;
      this.timeStamp = timestamp;
      this.selPaneNode(nodeId);
      this.setDragNodePosition(e_x, e_y);
    },
    dragging(timestamp, eventX, eventY) {
      switch (this.currentEvent) {
        case DAG_EVENTS.PRE_MOVE_NODE:
          if (timestamp - this.timeStamp > 200) {
            this.currentEvent = DAG_EVENTS.MOVE_NODE;
          }
          break;
        case DAG_EVENTS.MOVE_NODE:
           this.setDragNodePosition(eventX, eventY);
           break;
        case DAG_EVENTS.DRAG_LINK:
          this.setDragLinkPosition(eventX, eventY);
          break;
        case DAG_EVENTS.MOVE_GRAPH:
          this.moveGraph(eventX, eventY);
          break;
        default:
          break;
      }
    },
    dragEnd(e_x, e_y) {
      if (this.currentEvent === DAG_EVENTS.MOVE_NODE) {
        this.paneDragEnd(e_x, e_y);
      }
      this.currentEvent = null;
    },
    svgMouseDown(e) {
      this.currentEvent = DAG_EVENTS.MOVE_GRAPH;
      this.graphMovePre(e);
    },

    linkBegin(nodeId, x, y) {
      this.currentEvent = DAG_EVENTS.DRAG_LINK;
      this.focused_node_id = nodeId;
      this.setDragLinkPosition(x, y, true);
    },
    linkEnd(dst_node_id) {
      if (this.currentEvent === DAG_EVENTS.DRAG_LINK) {
        let src_node_id = this.focused_node_id;
        this.addEdge({ src_node_id, dst_node_id });
      }
      this.currentEvent = null;
    },

    sizeExpand() {
      this.changeSize({ change_type: SIZE_CHANGE_TYPE.EXPAND }).catch(err => {
        alert(err);
      });
    },
    sizeShrink() {
      this.changeSize({ change_type: SIZE_CHANGE_TYPE.SHRINK }).catch(err => {
        alert(err);
      });
    },
    // use mouse to expand or shrink svg
    onMouseWheel(wheelDelta) {
        let multiple = (wheelDelta / 10);
        if (this.canMouseWheelUse && (multiple * multiple) > 1) {
          multiple > 0 ? this.sizeExpand() : this.sizeShrink();
          this.canMouseWheelUse = false;
          // cool down
          setTimeout(() => {
            this.canMouseWheelUse = true
          }, 50)
        }
      },

    paneDragEnd(e_x, e_y) {
      let {svg_left, svg_top} = this.getSvgPosition();
      this.dragNode = { posX: 0, posY: 0 };
      const x =
        (e_x - svg_left - this.svgCoordinate.offset_x) / this.svgScale - 90;
      const y =
        (e_y - svg_top - this.svgCoordinate.offset_y) / this.svgScale - 15;
      let params = {
        id: this.focused_node_id,
        pos_x: x,
        pos_y: y
      };
      this.moveNode(params);
    },
    selPaneNode(id) {
      this.focused_node_id = id;
      console.log("The current selected node: ", this.focused_node_id);
    },

    graphMovePre(e) {
      const { x, y } = e;
      this.mouse_pos_pre_graph_moving = { x, y };
      this.svg_offset_pre_graph_moving = { x: this.svgCoordinate.offset_x, y: this.svgCoordinate.offset_y };
    },
    moveGraph(e_x, e_y) {
      const { x, y } = this.mouse_pos_pre_graph_moving;
      let offset_x = e_x - x + this.svg_offset_pre_graph_moving.x;
      let offset_y = e_y - y + this.svg_offset_pre_graph_moving.y;
      this.changeSvgOffset({ offset_x, offset_y });
    },

    setDragNodePosition(e_x, e_y) {
      let {svg_left, svg_top} = this.getSvgPosition();
      const x = e_x - svg_left - this.svgCoordinate.offset_x;
      const y = e_y - svg_top - this.svgCoordinate.offset_y;
      this.dragNode = {
        posX: x / this.svgScale - 90,
        posY: y / this.svgScale - 15
      };
    },
    setDragLinkPosition(e_x, e_y, init) {
      let {svg_left, svg_top} = this.getSvgPosition();
      const x =
        (e_x - svg_left - this.svgCoordinate.offset_x) / this.svgScale;
      const y =
        (e_y - svg_top - this.svgCoordinate.offset_y) / this.svgScale;
      if (init) {
        this.dragLink = Object.assign({}, this.dragLink, {
          fromX: x,
          fromY: y
        });
      }
      this.dragLink = Object.assign({}, this.dragLink, { toX: x, toY: y });
    },
    close_node_menu() {
      this.node_menu_data = { isShow: false, x: -9999, y: -9999, nodeId: null };
    },
    close_arrow_menu() {
      this.arrow_menu_data = { isShow: false, x: -9999, y: -9999, arrowId: null };
    },
    r_click_node(e_x, e_y, nodeId) {
      let {svg_left, svg_top} = this.getSvgPosition();
      const x = e_x - svg_left;
      const y = e_y - svg_top;
      this.node_menu_data = {
        isShow: true,
        x,
        y,
        nodeId
      };
    },
    r_click_arrow(e_x, e_y, arrowId) {
      let {svg_left, svg_top} = this.getSvgPosition();
      const x = e_x - svg_left;
      const y = e_y - svg_top;
      this.arrow_menu_data = {
        isShow: true,
        x,
        y,
        arrowId
      };
    }
  },
  data() {
    return {
      focused_node_id: null,
      dragNode: {
        // simulate node
        posX: 9999,
        posY: 9999
      },
      dragLink: {
        // simulate link
        fromX: 0,
        fromY: 0,
        toX: 0,
        toY: 0
      },
      currentEvent: null,
      timeStamp: "",
      node_menu_data: {
        nodeId: null,
        isShow: false,
        x: -9999,
        y: -9999
      },
      arrow_menu_data: {
        arrowId: null,
        isShow: false,
        x: -9999,
        y: -9999
      },
      // the position of mouse before svg graph moving
      mouse_pos_pre_graph_moving: {
        x: 0,
        y: 0
      },
      // the offset of svg before svg graph moving
      svg_offset_pre_graph_moving: {
        x: 0,
        y: 0
      },
      canMouseWheelUse: true
    };
  },
  components: {
    Arrow,
    Node,
    SimulateArrow,
    SimulateNode,
    NodeMenu,
    ArrowMenu
  }
};
</script>

<style lang="scss" scoped>
</style>
