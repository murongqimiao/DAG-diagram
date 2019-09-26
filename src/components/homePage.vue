<template>
  <div class="page-content" @mousemove="moveNodesBus($event.x, $event.y)" @mouseup="endNodesBus($event.x, $event.y, $event.toElement.id)">
    <div class="tapBar">
      <div class="title">DAG Visualization</div>
    </div>
    <div class="mainContent">
      <div class="nav">
        <div class="nodes-bus">
          <span @mousedown="startNodesBus($event.x, $event.y)">Drag Me!!!</span>
        </div>
        <div class="helpContent">
          <p>Feature:</p>
          <p>1.Move Graph</p>
          <p>2.Drag nodes to create</p>
          <p>3.Build edges</p>
          <p>4.Delete nodes</p>
          <p>5.Move nodes</p>
          <p>6.Delete edges</p>
          <p>7.Scale the svg</p>
          <p>8.Refresh layout of svg</p>
        </div>
      </div>
      <div class="dag-content">
        <dagContent/>
      </div>
    </div>
    <div class="control">
      <Control />
    </div>
    <nodes-bus v-if="isDraggingBus" :pos_x="busPos.pos_x" :pos_y="busPos.pos_y" />
  </div>
</template>

<script>
import dagContent from "./dag";
import Control from "./dag/control.vue";
import NodesBus from "./nodesBus";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      isDraggingBus: false,
      busPos: {
        pos_x: 0,
        pos_y: 0
      }
    };
  },
  computed: {
    ...mapState({
      svgScale: state => state.dagStore.svgSize,
      svgCoordinate: state => state.dagStore.svgCoordinate
    }),
    ...mapGetters(["getSvgPosition"])
  },
  methods: {
    ...mapMutations(["addNode"]),
    startNodesBus(e_x, e_y) {
      this.busPos = Object.assign({}, this.busPos, {
        pos_x: e_x,
        pos_y: e_y
      });
      this.isDraggingBus = true;
    },
    moveNodesBus(e_x, e_y) {
      if (this.isDraggingBus) {
        this.busPos = Object.assign({}, this.busPos, {
          pos_x: e_x,
          pos_y: e_y
        });
      }
    },
    endNodesBus(e_x, e_y, event_dst_id) {
      if (this.isDraggingBus && event_dst_id === "svgContent") {
        let {svg_left, svg_top} = this.getSvgPosition();
        const pos_x = (e_x - svg_left - this.svgCoordinate.offset_x) / this.svgScale - 90;
        const pos_y = (e_y - svg_top - this.svgCoordinate.offset_y) / this.svgScale - 15;
        const params = {
          node_name: 'Sample',
          pos_x: pos_x,
          pos_y: pos_y
        };
        this.addNode(params);
      }
      this.isDraggingBus = false;
    }
  },
  mounted() {
  },
  components: {
    dagContent,
    Control,
    NodesBus
  }
};
</script>

<style lang="scss" scoped>
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
    height: 70px;
    background-color: #212528;
    display: flex;
    padding-top: 10px;
    padding-left: 300px;
    .title {
      color: white;
      font-weight: bold;
      font-size: 30px;
    }
  }

  .mainContent {
    width: 100%;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    text-align: left;
  }

  .nav {
    width: 300px;
    background: #212528;
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    div {
      color: #ffffff;
      height: 50px;
      line-height: 50px;
      width: 100%;
    }
  }

  .nodes-bus {
    user-select: none;
    text-align: center;
    span {
      font-size: 16px;
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
  }

  .control {
    position: absolute;
    left: 300px;
  }

  .helpContent {
    font-size: 16px;
    margin-top: 100px;
    text-align: left;
    text-indent: 20px;
    line-height: 20px;
  }

  .dag-content {
    position: absolute;
    left: 300px;
    top: 0;
    bottom: 0;
    right: 0;
  }
</style>
