<!-- 这里演示新组件类型的扩充 折线组件 -->
<template>
        <g v-if="this.DataAll" class="arrow-rect" @mousemove="dragArrowCenter" @mouseout="dragArrowCenterEnd" @mouseup="dragArrowCenterEnd">
          <path
          @mouseover="pathHover"
          @mouseout="pathOut"
          :class="(isHover || r_click_menu) ? 'connector-hl' : each.type && each.type == 'active' ? 'connector-active' : each.type && each.type == 'success' ? 'connector' : 'defaultArrow'"
          :d="computedLink()"
          :style="each.style"
          @contextmenu="r_click($event)"
          ></path>
          <text ref="edgeText" v-if="each.edgesText" :style="computedText()">{{each.edgesText}}</text>
          <polyline class="only-watch-el" :points="computedArrow()"
          style="stroke:#006600;"/>
          <circle @mousedown="touchArrowCenter" :cx="computedCenterCx()" :cy="computedCenterCy()" r="5"
            style="stroke:transparent;
            stroke-width: 100;
            fill:#FFFFFF"/>
          <circle class="only-watch-el" :cx="computedCx()" :cy="computedCy()" r="5"
            style="stroke:#006600;
            stroke-width: 2;
            fill:#FFFFFF"/>
            <g v-if="r_click_menu">
              <foreignObject width="1000vw" height="1000vh" style="position: relative" @click="click_menu_cover($event)">
                <body xmlns="http://www.w3.org/1999/xhtml" :style="menu_style">
                    <div class="menu_contain">
                      <span @click="delEdges">删除</span>
                    </div>
                </body>
              </foreignObject>
            </g>
        </g>
</template>
<script>

export default {
  props: {
    DataAll: {
      type: Object
    },
    each: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  computed: {
   svgScale() { return sessionStorage['svgScale'] || 1 }
  },
  data() {
    return {
      isHover: false,
      r_click_menu: false,
      menu_style: {
        position: "absolute",
        left: `${358}px`,
        top: `${264}px`
      },
      currentEvent: null,
      distanceY: 0,
      ownVoffset: 0,
    };
  },
  methods: {
    pathHover() {
      this.isHover = true;
    },
    pathOut() {
      this.isHover = false;
    },
    dragArrowCenterEnd(e) {
      e.stopPropagation();
      e.preventDefault(); 
      if (this.currentEvent === "dragArrowCenter") {
        this.currentEvent = null;
        this.distanceY = 0;
      }
    },
    touchArrowCenter(e) {
      e.stopPropagation();
      e.preventDefault();
      console.log("touch", e)
      this.currentEvent = "dragArrowCenter";
      this.distanceY = e.pageY;
      this.ownVoffset = this.each.VOffset || 0
    },
    dragArrowCenter(e) {
      if (this.currentEvent === "dragArrowCenter") {
        const _Y = e.pageY;
        const VOffset = _Y - this.distanceY + this.ownVoffset;
        console.log("VOffset->", VOffset)
        const _DataAll = JSON.parse(JSON.stringify(this.DataAll))
        _DataAll.rectEdges[this.index].VOffset = VOffset
        this.$emit('updateData', _DataAll, "updateVoffset")
      }
    },
    click_menu_cover(e) {
      // 点击遮罩
      this.r_click_menu = false;
      e.stopPropagation();
      e.preventDefault();
      e.cancelBubble = true;
    },
    delEdges() { // 删除此条连线
      let params = {
        id: this.each.id
      }
      this.$emit('delEdge', params)
    },
    r_click(e) {
      console.log(this.svgScale)
      const x = e.offsetX;
      const y = e.offsetY;
      this.menu_style = Object.assign({}, this.menu_style, { left: `${(x - (sessionStorage['svg_left'] || 0)) / this.svgScale}px`, top: `${(y - (sessionStorage['svg_top'] || 0)) / this.svgScale}px` })
      this.r_click_menu = true;
      e.stopPropagation();
      e.preventDefault();
      e.cancelBubble = true;
    },
    computedLink() {
      // 计算起始点坐标
      let f_X, f_Y, t_X, t_Y
      if (!this.DataAll) {
        return `M 0 0 T 0 0`;
      } else {
        const {
          dst_input_idx, // 目标
          dst_node_id, // 目标id
          src_node_id, // 来源id
          src_output_idx, // 来源
          VOffset = 0, // 纵向位移量
        } = this.each;
        const f_Pos = this.DataAll.nodes.find(item => item.id === src_node_id);
        const t_Pos = this.DataAll.nodes.find(item => item.id === dst_node_id);
        if (!f_Pos || !t_Pos) { alert(src_node_id) }
        f_X = f_Pos.pos_x + (180 / (f_Pos.out_ports.length + 1)) * (src_output_idx + 1);
        f_Y = f_Pos.pos_y + 30;
        t_X = t_Pos.pos_x + (180 / (t_Pos.in_ports.length + 1)) * (dst_input_idx + 1);
        t_Y = t_Pos.pos_y;
        // 上面逻辑通过父子节点位置计算起始点
        return `M ${f_X} ${f_Y} V ${((f_Y + t_Y) / 2 + VOffset)} H ${t_X} T ${t_X} ${t_Y}`;
      }
    },
    computedText() { // 计算文字坐标
        if (!this.DataAll) {
        return `M 0 0 T 0 0`;
      } else {
          const {
            dst_input_idx, // 目标
            dst_node_id, // 目标id
            src_node_id, // 来源id
            src_output_idx // 来源
          } = this.each;
          const f_Pos = this.DataAll.nodes.find(item => item.id === src_node_id);
          const t_Pos = this.DataAll.nodes.find(item => item.id === dst_node_id);
          if (!f_Pos) {
            alert(src_node_id)
          }
          if (!t_Pos) {
            alert(dst_node_id)
          }
          const f_X =
            f_Pos.pos_x +
            (180 / (f_Pos.out_ports.length + 1)) * (src_output_idx + 1);
          const f_Y = f_Pos.pos_y + 30;
          const t_X =
            t_Pos.pos_x +
            (180 / (t_Pos.in_ports.length + 1)) * (dst_input_idx + 1);
          const t_Y = t_Pos.pos_y;
          return {
            transform: `translate(${(f_X + t_X) / 2}px, ${(f_Y + t_Y) / 2}px)`,
            stroke: '#fff',
            ...this.each.textStyle
          };
        }
    },
    computedArrow() {
      // 计算箭头坐标
      if (!this.DataAll) {
        return `0,0 0,0 0,0`;
      } else {
        const {
          dst_input_idx,
          dst_node_id,
          src_node_id,
          src_output_idx
        } = this.each;
        const t_Pos = this.DataAll.nodes.find(item => item.id === dst_node_id);
        let t_X = t_Pos.pos_x + (180 / (t_Pos.in_ports.length + 1)) * (dst_input_idx + 1);
        let t_Y = t_Pos.pos_y;
        if (this.isVertical()) {
          return `${t_X} ${t_Y + 3} ${t_X - 3} ${t_Y - 3} ${t_X + 3} ${t_Y - 3}`;
        } else {
          let t_X = t_Pos.pos_x
          let t_Y = t_Pos.pos_y + 15
          return `${t_X - 2} ${t_Y + 3} ${t_X - 3} ${t_Y - 3} ${t_X + 3} ${t_Y - 1}`
        }
      }
    },
    computedCx() {
      const { src_node_id, src_output_idx } = this.each;
      const f_Pos = this.DataAll.nodes.find(item => item.id === src_node_id);
      let f_X = 0
      if (this.isVertical()) {
        f_X = f_Pos.pos_x + (180 / (f_Pos.out_ports.length + 1)) * (src_output_idx + 1);
      } else {
        f_X = f_Pos.pos_x + 180
      }
      return `${f_X}`;
    },
    computedCy() {
      let f_Y = 0
      const { src_node_id } = this.each;
      const f_Pos = this.DataAll.nodes.find(item => item.id === src_node_id);
      if (this.isVertical()) {
        f_Y = f_Pos.pos_y + 30;
      } else {
        f_Y = f_Pos.pos_y + 15
      }
      return `${f_Y}`;
    },
    computedCenterCy() {
      let f_X, f_Y, t_X, t_Y;
      const VConstantHeight = 15;
      const {
        dst_input_idx, // 目标
        dst_node_id, // 目标id
        src_node_id, // 来源id
        src_output_idx, // 来源
        VOffset = 0, // 纵向位移量
      } = this.each;
      const f_Pos = this.DataAll.nodes.find(item => item.id === src_node_id);
      const t_Pos = this.DataAll.nodes.find(item => item.id === dst_node_id);
      f_Y = f_Pos.pos_y;
      t_Y = t_Pos.pos_y;
      return `${(f_Y + t_Y) / 2 + VOffset + VConstantHeight}`;
    },
    computedCenterCx() {
      const NODE_WIDTH_CONSTANT = 90; // 节点固定宽度
      let f_X, f_Y, t_X, t_Y
      const {
        dst_input_idx, // 目标
        dst_node_id, // 目标id
        src_node_id, // 来源id
        src_output_idx, // 来源
        VOffset = 0, // 纵向位移量
      } = this.each;
      const f_Pos = this.DataAll.nodes.find(item => item.id === src_node_id);
      const t_Pos = this.DataAll.nodes.find(item => item.id === dst_node_id);
      f_X = f_Pos.pos_x;
      t_X = t_Pos.pos_x;
      return `${f_X + NODE_WIDTH_CONSTANT + ((t_X - f_X) / 2)}`;;
    },
    isVertical() {
      let GlobalConfig = { isVertical: true }
      let _GlobalConfig = localStorage.getItem('GlobalConfig')
      if (_GlobalConfig && _GlobalConfig.length > 0) {
        GlobalConfig = Object.assign(GlobalConfig, JSON.parse(_GlobalConfig))
      }
      return GlobalConfig.isVertical
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.edgeText) {
        console.log(this.$refs.edgeText.style.width)
      }
    })
  }
};
</script>

<style scoped>
.arrow-rect {
  padding: 20px;
  position: relative;
  width: 100%;
  height: 100%;
}
.arrow-rect::after {
  content: ".";
  font-size: 0;
  position: absolute;
  left: -50px;
  right: -50px;
  top: -50;
  height: -50px;
}
.only-watch-el {
   pointer-events: none;
}
.connector {
  stroke: #00c0ff;
  stroke-width: 2px;
  /* fill: none; */
  fill: transparent;
  cursor: pointer;
  stroke-dasharray: 100%;
  animation: line_success 2s;
}
@keyframes line_success {
  0% {
    stroke-dashoffset: 100%;
  }
  100% {
    stroke-dashoffset: 0%;
  }
}
.connector-active {
  stroke: rgba(91, 230, 20, 0.6);
  /* fill: none; */
  fill: transparent;
  cursor: pointer;
  stroke-width: 2px;
  stroke-dasharray: 5px;
  stroke-dashoffset: 1000px;
  animation: grown 40s infinite linear;
}
.defaultArrow {
  stroke: #00c0ff;
  stroke-width: 2px;
  /* fill: none; */
  fill: transparent;
  cursor: pointer;
  stroke-dasharray: 5px;
  stroke-dashoffset: 1000px;
  animation: grown 40s infinite linear;
}
@keyframes grown {
  to{
    stroke-dashoffset: 0px;
  }
}
.menu_cover {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.connector-hl {
  stroke: #00c0ff;
  stroke-width: 5px;
  /* fill: none; */
  fill: transparent;
  cursor: pointer;
}
.menu_contain {
  width: 150px;
  border: 1px solid rgba(1, 1, 1, 0.3);
  background: #ffffff;
  border-radius: 5px;
  padding: 3px;
}
.meun_contain  span {
  width: 100%;
  display: inline-block;
}
.menu_contain  span:hover {
    background-color: rgba(40,157,233, .3);
    cursor: none;
}
</style>
