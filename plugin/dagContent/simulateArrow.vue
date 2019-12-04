<!--  模拟剪头拖动效果  -->
<template>
       <g>
          <path
          class="connector only-watch-el"
          :d="dragLinkPath()"
          ></path>
          <circle :cx="this.dragLink.fromX" :cy="this.dragLink.fromY" r="5"
            style="stroke:#006600;
            stroke-width: 2;
            fill:#CCCCCC"/>
          <polyline class="only-watch-el" :points="computedArrow()"
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
      if (this.isVertical()) {
        return `M ${fromX} ${fromY}  Q ${fromX} ${fromY + 50} ${(toX + fromX) /
        2} ${(fromY + toY) / 2} T ${toX} ${toY}`;
      } else {
        return `M ${fromX} ${fromY} Q ${fromX + 30} ${fromY}  ${(toX + fromX) /
        2} ${(fromY + toY) / 2} T ${toX} ${toY}`;
      }
    },
    computedArrow() {
      // 计算箭头坐标
      const { toX, toY } = this.dragLink;
      if (this.isVertical()) {
        return `${toX} ${toY} ${toX - 3} ${toY - 6} ${toX + 3} ${toY - 6}`;
      } else {
        return `${toX - 3} ${toY + 3} ${toX} ${toY} ${toX - 3} ${toY - 3}`;
      }
    },
    isVertical() {
      let GlobalConfig = { isVertical: true }
      let _GlobalConfig = localStorage.getItem('GlobalConfig')
      if (_GlobalConfig && _GlobalConfig.length > 0) {
        GlobalConfig = Object.assign(GlobalConfig, JSON.parse(_GlobalConfig))
      }
      return GlobalConfig.isVertical
    }
  }
};
</script>

<style  scoped>
.connector {
  stroke: hsla(0, 0%, 50%, 0.6);
  stroke-width: 2px;
  fill: none;
}
.only-watch-el {
  pointer-events: none;
}
.dragLinkArrows {
  border-top: 4px solid black;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  z-index: -10;
}
</style>
