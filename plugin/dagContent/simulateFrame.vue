<!--  模拟节点拖动效果  -->
<template>
  <g
  :transform="`translate(${dragFrame.posX}, ${dragFrame.posY})`"
  class="dragFrame">
    <foreignObject width="180" height="30" >
      <body style="margin: 0" xmlns="http://www.w3.org/1999/xhtml">
        <div
        class="dragFrameArea">
        </div>
      </body>
    </foreignObject>
  </g>
</template>
<script>
export default {
  props: {
    dragFrame: {
      type: Object
    }
  },
  methods: {}
};
</script>

<style  scoped>
.dragFrame {
  z-index: -10;
}
.dragFrame .dragFrameArea {
  width: 180px;
  height: 30px;
  background-color: hsla(0, 0%, 100%, 0.9);
  border: 1px dashed black;
  border-radius: 15px;
  font-size: 12px;
  -webkit-transition: background-color 0.2s;
  transition: background-color 0.2s;
  box-sizing: border-box;
}
</style>
