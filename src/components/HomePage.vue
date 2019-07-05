<template>
  <div class="page-content" @mousedown="startNodesBus($event)" @mousemove="moveNodesBus($event)" @mouseup="endNodesBus($event)">
    <div class="tapBar">
      <div class="title">DAG 机器学习|流程图 可视化</div>
    </div>
    <div class="mainContent">
      <div class="nav">
        <div>↓↓↓拖动节点至右边↓↓↓</div>
        <div class="nodes_bus">
          <span @mousedown="dragIt('Constant')">这是一个常量</span>
          <span @mousedown="dragIt('Function')">这是一个函数</span>
        </div>
        <div id="helpContent">
          <p>帮助:</p>
          <p>1.画布拖动, 空白处摁下鼠标左键, 然后移动</p>
          <p>2.节点拖动, 左键点击节点,按着左键拖动 </p>
          <p>3.关系建立, 在节点下部滑动鼠标, 鼠标移入小圆圈会改变状态, 然后摁着左键拖动到其他节点的顶部, 移入节点顶部变绿即可松手</p>
          <p>4.删除节点, 节点上点右键,找删除</p>
          <p>5.增加节点,拖动左侧节点实例到右侧</p>
          <p>6.删除关系,关系连线上点右键, 找删除</p>
          <p>7.全屏,左上角控制面板找全屏</p>
          <p>8.放缩, 滚动鼠标滚轮,mac双指滑触摸,或者左上角控制面板找全屏</p>
          <p>9.新增节点动态训练模拟,点击控制台的运行图标即可</p>
        </div>
      </div>
      <div class="DAG-content">
        <dagContent/>
      </div>
    </div>
    <nodes-bus v-if="dragBus" :value="busValue.value" :pos_x="busValue.pos_x" :pos_y="busValue.pos_y" />
  </div>
</template>

<script>
import dagContent from "./STEP/dagContent";
import NodesBus from "./nodesBus";
import { mapActions } from "vuex";

export default {
  data() {
    return {
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
        this.addNode(params);
      }
      window.sessionStorage["dragDes"] = null;
      this.dragBus = false;
    }
  },
  mounted() {
  },
  components: {
    dagContent,
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
