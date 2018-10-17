<!--  模拟剪头拖动效果  -->
<template>
       <g>
          <path
          class="connector"
          :d="dragLinkPath()"
          ></path>
          <circle :cx="this.dragLink.fromX" :cy="this.dragLink.fromY" r="7"
            style="stroke:#006600;
            stroke-width: 2;
            fill:#CCCCCC"/>
          <polyline  :points="computedArrow()"
          style="stroke:#006600;"/>
        </g>
</template>
<script>
export default {
  props: {
    dragLink: {
      type: Object
    }
  },
  methods: {
    dragLinkPath() {
      const { fromX, fromY, toX, toY } = this.dragLink;
      return `M ${fromX} ${fromY}  Q ${fromX} ${fromY + 50} ${(toX + fromX) /
        2} ${(fromY + toY) / 2} T ${toX} ${toY}`;
    },
    computedArrow() {
      // 计算箭头坐标
      const { toX, toY } = this.dragLink;
      return `${toX} ${toY} ${toX - 3} ${toY - 6} ${toX + 3} ${toY - 6}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.connector {
  stroke: hsla(0, 0%, 50%, 0.6);
  stroke-width: 2px;
  fill: none;
}
.dragLinkArrows {
  border-top: 4px solid black;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  z-index: -10;
}
</style>
