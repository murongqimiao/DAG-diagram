<template>
  <div class="page-content" @mousedown="startNodesBus($event)" @mousemove="moveNodesBus($event)" @mouseup="endNodesBus($event)">
    <div class="tapBar">
      <div :class="item.sel ? 'tapEachSel ': 'tapEach'"  @click="selStep(i)" v-for="(item , i) in tap" :key="i">{{ item.name }}</div>
    </div>
    <div class="mainContent">
      <div class="nav">
        <div>假装是侧栏导航</div>
        <div>点击顶部导航,查看实现流程</div>
        <div class="nodes_bus">
          <span @mousedown="dragIt('拖动1')">拖动我吧1</span>
          <span @mousedown="dragIt('拖动2')">拖动我吧2</span>
        </div>
      </div>
      <div class="DAG-content">
        <Step1 v-if="tap[0].sel"/>
        <Step2 v-if="tap[1].sel"/>
        <Step3 v-if="tap[2].sel"/>
        <Step4 v-if="tap[3].sel"/>
        <Step5 v-if="tap[4].sel"/>
        <Step6 v-if="tap[5].sel"/>
        <Step7 v-if="tap[6].sel"/>
      </div>
    </div>
    <nodes-bus v-if="dragBus" :value="busValue.value" :pos_x="busValue.pos_x" :pos_y="busValue.pos_y" />
  </div>
</template>

<script>
import { tap } from "./DataMainPage.js";
import Step from "./STEP";
import NodesBus from "./nodesBus";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      tap: tap,
      dragBus: false,
      busValue: {
        value: "name",
        pos_x: 100,
        pos_y: 100
      }
    };
  },
  methods: {
    ...mapActions(["addNode"]),
    selStep(i) {
      window.sessionStorage["step"] = i;
      this.tap.forEach((item, n) => {
        i - n === 0 ? (item.sel = true) : (item.sel = false);
      });
      this.tap = JSON.parse(JSON.stringify(this.tap));
    },
    dragIt(val) {
      sessionStorage["dragDes"] = JSON.stringify({
        drag: true,
        name: val
      });
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
        dragDes = JSON.parse(sessionStorage["dragDes"])
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
      let dragDes = null;
      if (sessionStorage["dragDes"]) {
        dragDes = JSON.parse(sessionStorage["dragDes"])
      }
      if (dragDes && dragDes.drag && e.toElement.id === "svgContent") {
        const { model_id, type } = dragDes;
        const pos_x = (e.offsetX - 90) / (sessionStorage['svgScale'] || 1); // 参数修正
        const pos_y = (e.offsetY - 15) / (sessionStorage['svgScale'] || 1); // 参数修正
        const params = {
          model_id: sessionStorage["newGraph"],
          desp: {
            type,
            pos_x,
            pos_y,
            name: this.busValue.value
          }
        };
        this.addNode(params);
      }
      window.sessionStorage["dragDes"] = null;
      this.dragBus = false;
    }
  },
  mounted() {
    if (window.sessionStorage["step"]) {
      const i = window.sessionStorage.step;
      this.selStep(i);
    }
    sessionStorage['svgScale'] = 1
  },
  components: {
    ...Step,
    NodesBus
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  overflow: scroll;
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
}
</style>
