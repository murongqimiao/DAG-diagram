<template>
     <g v-if="isEditAreaShow.value">
        <foreignObject width="100%" height="100%" style="position: relative" @click="click_menu_cover($event)">
        <body xmlns="http://www.w3.org/1999/xhtml" :style="get_menu_style()">
            <div class="menu_contain">
                <span @click="delEdges">删除节点</span>
                <span @click="changePort('in_ports')">增加入口</span>
                <span @click="changePort('out_ports')">增加出口</span>
            </div>
        </body>
        </foreignObject>
    </g>
</template>

<script>
export default {
  props: {
    isEditAreaShow: {
      type: Object,
      default: () => {
        return {
        value: false,
        x: -9999,
        y: -9999,
        id: null
        }
      }
    }
  },
  methods: {
    click_menu_cover(e) {
      this.$emit('close_click_nodes')
      e.preventDefault();
      e.cancelBubble = true;
      e.stopPropagation();
    },
    get_menu_style() {
      let left = this.isEditAreaShow.x;
      let top = this.isEditAreaShow.y;
      return {
        position: "absolute",
        left: left + 'px',
        top: top + 'px'
      }
    },
    delEdges() {
      let params = {
        model_id: sessionStorage['newGraph'],
        id: this.isEditAreaShow.id
      }
      this.$emit('delNode', params)
      this.$emit('close_click_nodes')
    },
    changePort(action) {
      this.$emit('changePort', action, this.isEditAreaShow.id)
    }
  }
};
</script>

<style scoped>
.connector {
  stroke: hsla(0, 0%, 50%, 0.6);
  stroke-width: 2px;
  fill: none;
}
.menu_cover {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.connector-hl {
  stroke: hsla(0, 0%, 50%, 0.4);
  stroke-width: 5px;
  fill: none;
}
.menu_contain {
  width: 150px;
  border: 1px solid rgba(1, 1, 1, 0.3);
  background: #ffffff;
  border-radius: 5px;
  padding: 3px;

}
.menu_contain span{
  width: 100%;
  display: inline-block;
}
.menu_contain span:hover {
  background-color: rgba(40, 157, 233, 0.3);
  cursor: pointer;
}
</style>
