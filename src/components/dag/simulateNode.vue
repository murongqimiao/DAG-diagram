<!--  simulate node  -->
<template>
  <g :transform="getSimulateNodeTransform">
    <foreignObject class="main-body">
      <body xmlns="http://www.w3.org/1999/xhtml">
        <div class="drag-node-area"></div>
      </body>
    </foreignObject>
  </g>
</template>
<script>
export default {
  props: {
    dragNode: {
      type: Object
    }
  },
  computed: {
    getSimulateNodeTransform() {
      return `translate(${this.dragNode.posX}, ${this.dragNode.posY})`;
    }
  }
};
</script>

<style lang="scss" scoped>
  .main-body {
    width: 180px;
    height: 30px;
  }
  .drag-node-area {
    width: 180px;
    height: 30px;
    background-color: hsla(0, 0%, 100%, 0.9);
    border: 1px dashed black;
    border-radius: 15px;
    font-size: 12px;
    transition: background-color 0.2s;
    box-sizing: border-box;
  }
  // avoid margin with <g>
  body {
    margin: 0;
  }
</style>
