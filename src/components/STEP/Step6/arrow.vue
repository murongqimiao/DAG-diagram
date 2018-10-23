<!--  剪头渲染组件  -->
<template>
        <g v-if="this.DataAll">
          <path
          @mouseover="pathHover"
          @mouseout="pathOut"
          :class="(isHover || r_click_menu) ? 'connector-hl' : 'connector'"
          :d="computedLink()"
          @contextmenu="r_click($event)"
          ></path>
          <polyline  :points="computedArrow()"
          style="stroke:#006600;"/>
          <circle :cx="computedCx()" :cy="computedCy()" r="5"
            style="stroke:#006600;
            stroke-width: 2;
            fill:#FFFFFF"/>
            <g v-if="r_click_menu">
              <foreignObject width="100%" height="100%" style="position: relative" @click="click_menu_cover($event)">
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
import { mapActions } from 'vuex';

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
  data() {
    return {
      isHover: false,
      r_click_menu: false,
      menu_style: {
        position: "absolute",
        left: "358px",
        top: "264px"
      }
    };
  },
  methods: {
    ...mapActions(['delEdge']),
    pathHover() {
      this.isHover = true;
    },
    pathOut() {
      this.isHover = false;
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
        model_id: sessionStorage['newGraph'],
        id: this.each.id
      }
      this.delEdge(params)
    },
    r_click(e) {
      const x = e.offsetX;
      const y = e.offsetY;
      this.menu_style = Object.assign({}, this.menu_style, { left: `${x}px`, top: `${y}px` })
      this.r_click_menu = true;
      e.stopPropagation();
      e.preventDefault();
      e.cancelBubble = true;
    },
    computedLink() {
      // 计算起始点坐标
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
        const f_X =
          f_Pos.pos_x +
          (180 / (f_Pos.out_ports.length + 1)) * (src_output_idx + 1);
        const f_Y = f_Pos.pos_y + 30;
        const t_X =
          t_Pos.pos_x +
          (180 / (t_Pos.in_ports.length + 1)) * (dst_input_idx + 1);
        const t_Y = t_Pos.pos_y;
        return `M ${f_X} ${f_Y}  Q ${f_X} ${f_Y + 50} ${(t_X + f_X) /
          2} ${(t_Y + f_Y) / 2} T ${t_X} ${t_Y}`;
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
        const t_X =
          t_Pos.pos_x +
          (180 / (t_Pos.in_ports.length + 1)) * (dst_input_idx + 1);
        const t_Y = t_Pos.pos_y;
        return `${t_X} ${t_Y + 3} ${t_X - 3} ${t_Y - 3} ${t_X + 3} ${t_Y - 3}`;
      }
    },
    computedCx() {
      const { src_node_id, src_output_idx } = this.each;
      const f_Pos = this.DataAll.nodes.find(item => item.id === src_node_id);
      const f_X =
        f_Pos.pos_x +
        (180 / (f_Pos.out_ports.length + 1)) * (src_output_idx + 1);
      return `${f_X}`;
    },
    computedCy() {
      const { src_node_id } = this.each;
      const f_Pos = this.DataAll.nodes.find(item => item.id === src_node_id);
      const f_Y = f_Pos.pos_y + 30;
      return `${f_Y}`;
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
  span {
    width: 100%;
    display: inline-block;
  }
}
.menu_contain  span:hover {
    background-color: rgba(40,157,233, .3);
    cursor: none;
}
</style>
