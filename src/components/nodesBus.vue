<template>
    <div class="nodes-bus" :style="getNodeBusStyle"></div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  props: {
    pos_x: {
      type: Number
    },
    pos_y: {
      type: Number
    }
  },
  computed: {
    ...mapState({
      svgScale: state => state.dagStore.svgSize
    }),
    getNodeBusStyle() {
      return {
        left: this.pos_x - 90 * this.svgScale + 'px',
        top: this.pos_y - 15 * this.svgScale + 'px',
        width: 180 * this.svgScale + 'px',
        height: 30 * this.svgScale + 'px',
        'border-radius': 15 * this.svgScale + 'px',
        'font-size': 12 * this.svgScale + 'px',
        border: `${1 * this.svgScale}px solid #289de9`
      }
    }
  },
  data() {
    return {
    };
  }
};
</script>

<style lang="scss" scoped>
  .nodes-bus {
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.9);
    transition: background-color 0.2s;
    position: absolute;
    pointer-events: none;
  }
</style>
