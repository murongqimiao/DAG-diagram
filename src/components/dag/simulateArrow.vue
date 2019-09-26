<!--  simulate link  -->
<template>
   <g class="only-watch-el">
      <path class="connector" :d="dragLinkPath"></path>
      <circle :cx="this.dragLink.fromX" :cy="this.dragLink.fromY" r="5" class="line"></circle>
      <polyline :points="computedArrow" class="head"></polyline>
    </g>
</template>

<script>
export default {
  props: {
    dragLink: {
      type: Object
    }
  },
  computed: {
    dragLinkPath() {
      const { fromX, fromY, toX, toY } = this.dragLink;
      return `M ${fromX} ${fromY} Q ${fromX} ${fromY + 50} ${(toX + fromX) /
        2} ${(fromY + toY) / 2} T ${toX} ${toY}`;
    },
    computedArrow() {
      const { toX, toY } = this.dragLink;
      return `${toX} ${toY} ${toX - 3} ${toY - 6} ${toX + 3} ${toY - 6}`;
    }
  }
};
</script>

<style lang="scss" scoped>
  .line {
    stroke: #006600;
    stroke-width: 2;
    fill: #CCCCCC
  }
  .head {
    stroke: #006600;
  }
  .connector {
    stroke: hsla(0, 0%, 50%, 0.6);
    stroke-width: 2px;
    fill: none;
  }
  .only-watch-el {
    // avoid listen hover events
    pointer-events: none;
  }
</style>
