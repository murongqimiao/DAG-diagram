<!--  剪头渲染组件  -->
<template>
        <g v-if="this.DataAll">
          <path
          class="connector"
          :d="computedLink()"
          ></path>
          <polyline  :points="computedArrow()"
          style="stroke:#006600;"/>
          <circle :cx="computedCx()" :cy="computedCy()" r="7"
            style="stroke:#006600;
            stroke-width: 2;
            fill:#FFFFFF"/>
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
  methods: {
    computedLink() {
      // 计算起始点坐标
      if (!this.DataAll) {
        return `M 0 0 T 0 0`;
      } else {
        const {
          dst_input_idx,
          dst_node_id,
          src_node_id,
          src_output_idx
        } = this.each;
        const f_Pos = this.DataAll.nodes.find(
          item => item.id === dst_node_id
        );
        const t_Pos = this.DataAll.nodes.find(
          item => item.id === src_node_id
        );
        const f_X =
          f_Pos.pos_x + (180 / (f_Pos.out_ports.length + 1)) * (dst_input_idx + 1);
        const f_Y = f_Pos.pos_y + 30;
        const t_X =
          t_Pos.pos_x + (180 / (t_Pos.in_ports.length + 1)) * (src_output_idx + 1);
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
        const t_Pos = this.DataAll.nodes.find(
          item => item.id === src_node_id
        );
        const t_X =
          t_Pos.pos_x + (180 / (t_Pos.in_ports.length + 1)) * (src_output_idx + 1);
        const t_Y = t_Pos.pos_y;
        return `${t_X} ${t_Y + 3} ${t_X - 3} ${t_Y - 3} ${t_X + 3} ${t_Y - 3}`;
      }
    },
    computedCx() {
      const {
          dst_node_id,
          dst_input_idx
        } = this.each;
        const f_Pos = this.DataAll.nodes.find(
          item => item.id === dst_node_id
        );
        const f_X =
          f_Pos.pos_x + (180 / (f_Pos.out_ports.length + 1)) * (dst_input_idx + 1);
          return `${f_X}`
    },
    computedCy() {
      const {
          dst_node_id
        } = this.each;
        const f_Pos = this.DataAll.nodes.find(
          item => item.id === dst_node_id
        );
        const f_Y = f_Pos.pos_y + 30;
        return `${f_Y}`
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
</style>
