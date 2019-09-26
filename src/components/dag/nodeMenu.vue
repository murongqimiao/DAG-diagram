<template>
   <g v-if="nodeMenuData.isShow">
    <foreignObject class="menu-wrapper" @click.prevent.stop="clickMenuCover()">
      <body xmlns="http://www.w3.org/1999/xhtml" :style="getMenuStyle">
        <div class="menu-contain">
          <span @click="clickDelNode">Delete Node</span>
          <span>Edit</span>
          <span>Do Something Else</span>
        </div>
      </body>
    </foreignObject>
  </g>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  props: {
    nodeMenuData: {
      type: Object,
      default: () => {
        return {
          isShow: false,
          x: -9999,
          y: -9999,
          nodeId: null
        }
      }
    }
  },
  computed: {
    getMenuStyle() {
      return {
        margin: 0,
        position: "absolute",
        left: `${this.nodeMenuData.x}px`,
        top: `${this.nodeMenuData.y}px`
      }
    }
  },
  methods: {
    ...mapMutations(['delNode']),
    clickMenuCover() {
      this.$emit('close-node-menu');
    },
    clickDelNode() {
      this.delNode({ id: this.nodeMenuData.nodeId });
      this.$emit('close-node-menu');
    }
  }
};
</script>

<style lang="scss" scoped>
  .menu-wrapper {
    width: 100%;
    height: 100%;
  }
  .menu-contain {
    width: 150px;
    border: 1px solid rgba(1, 1, 1, 0.3);
    background: #ffffff;
    border-radius: 5px;
    padding: 3px;
    span {
      width: 100%;
      display: inline-block;
      &:hover {
        background-color: rgba(40, 157, 233, 0.3);
        cursor: pointer;
      }
    }
  }
</style>
