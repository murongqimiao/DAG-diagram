<!--  arrow component  -->
<template>
  <g>
    <path
    :class="getPathClass"
    :d="computedLink"
    @mouseover="pathHover"
    @mouseout="pathOut"
    ></path>
    <polyline :points="computedArrow" class="arrow"></polyline>
  </g>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  props: ["arrowId", "srcNodeId", "dstNodeId"],
  computed: {
    ...mapState({
      svgScale: state => state.dagStore.svgSize
    }),
    ...mapGetters(["getNodePos"]),
    getPathClass() {
      if (this.isFocused) {
        return 'path-hl';
      } else {
        return 'path-default';
      }
    },
    computedLink() {
      let srcNodePos = this.getNodePos(this.srcNodeId);
      let dstNodePos = this.getNodePos(this.dstNodeId);
      const f_X = srcNodePos.pos_x + 90;
      const f_Y = srcNodePos.pos_y + 30;
      const t_X = dstNodePos.pos_x + 90;
      const t_Y = dstNodePos.pos_y - 3;
      return `M ${f_X} ${f_Y} Q ${f_X} ${f_Y + 50} ${(t_X + f_X) / 2} ${(t_Y + f_Y) / 2} T ${t_X} ${t_Y}`;
    },
    computedArrow() {
      let dstNodePos = this.getNodePos(this.dstNodeId);
      const t_X = dstNodePos.pos_x + 90;
      const t_Y = dstNodePos.pos_y - 3;
      return `${t_X} ${t_Y + 3} ${t_X - 3} ${t_Y - 3} ${t_X + 3} ${t_Y - 3}`;
    }
  },
  data() {
    return {
      isFocused: false
    }
  },
  methods: {
    pathHover() {
      this.isFocused = true;
    },
    pathOut() {
      this.isFocused = false;
    }
  }
};
</script>

<style lang="scss" scoped>
  .path-default {
    stroke: hsla(0, 0%, 50%, 0.1);
    stroke-width: 2px;
    fill: none;
    cursor: pointer;
  }
  .path-hl {
    stroke: hsla(0, 0%, 50%, 0.4);
    stroke-width: 5px;
    fill: none;
    cursor: pointer;
  }
  .arrow {
    stroke: #006600;
  }
</style>
