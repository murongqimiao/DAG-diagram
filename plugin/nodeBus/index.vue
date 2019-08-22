<!-- 这里是拖入节点时的模拟元素 -->
<template>
  <div class="nodesBus-contain" :style="{left: this.pos_x + 90 + 'px', top: this.pos_y + 30 + 'px' }">
    <div class="nodesBus">
      <span class="icon"></span>
      <span class="name">{{ value }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NodeBus',
  props: {
    value: {
      type: String,
      default: "传入内容"
    },
    pos_x: {
      type: Number
    },
    pos_y: {
      type: Number
    }
  },
  data() {
    return {
      name: this.value,
      left: this.pos_x,
      top: this.pos_y
    };
  }
};
</script>

<style scoped>
.nodesBus-contain {
  box-sizing: border-box;
  width: 10px;
  height: 10px;
  position: absolute;
  }
.nodesBus {
  box-sizing: border-box;
  transform: translate(-180px, -45px);
  width: 180px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #289de9;
  border-radius: 15px;
  font-size: 12px;
  -webkit-transition: background-color 0.2s;
  transition: background-color 0.2s;
  position: absolute;
  pointer-events: none;
}
.nodesBus .icon {
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
.nodesBus   .name {
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
</style>
