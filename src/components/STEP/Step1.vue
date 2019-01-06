<template>
  <svg
  id="svgContent"
  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="1260" height="1029" data-spm-anchor-id="TODO.11007039.0.i6.12b64a9bcbXQmm">
        <g
        v-for="(item, i) in DataAll"
        :key="i" class="svgEach"
        :transform="`translate(${item.translate.left}, ${item.translate.top})`">
            <foreignObject  width="180" height="30" >
            <body style="margin: 0" xmlns="http://www.w3.org/1999/xhtml">
              <div class="pane-node-content">
                  <span class="icon icon-data"></span>
                  <span class="name">{{item.name}}</span>
              </div>
            </body>
          </foreignObject>
        </g>
    </svg>
</template>
<script>
import DataAll from "./SVG_Data.js";
import { mapState } from 'vuex';

export default {
  computed: mapState({
    Data: store => store.DataAll
  }),
  mounted() {
  },
  data() {
    return {
      DataAll: DataAll, // 此处存放数据
      /**
       * 以下为数据结构简单讲解
       * 此数据结构为出版, 仅以实现为目的,在step5后数据结构替换为真实场景数据结构,稍有不同.
       */
      simulate: {
        name: "name1", // 此处为节点名称
        description: "description1",
        id: 1, // 此处为节点id, 捆绑整图id的唯一身份标识
        parentNode: 0, // 父节点数量
        childNode: 2, // 子节点数量
        imgContent: "", // 节点img地址
        parentDetails: { // 预留内容
          a: "",
          b: ""
        },
        linkTo: [{ id: 2 }, { id: 3 }], // 链接的子节点id
        translate: { // 每个节点的坐标位置 x轴 - y轴
          left: 100,
          top: 20
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.svgEach {
  position: relative;
}
.pane-node-content {
  width: 180px;
  height: 30px;
  background-color: hsla(0, 0%, 100%, 0.9);
  border: 1px solid #289de9;
  border-radius: 15px;
  font-size: 12px;
  -webkit-transition: background-color 0.2s;
  transition: background-color 0.2s;
  box-sizing: border-box;
  .icon {
    width: 26px;
    height: 26px;
    margin: 1px;
    border-radius: 100%;
    float: left;
    color: #fff;
    font-size: 16px;
    background-color: #289de9;
    cursor: pointer;
  }
  .name {
    float: left;
    margin-left: 2px;
    width: 135px;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
  }
  .parentLink {
    font-size: 0;
    height: 12px;
    width: 12px;
    position: absolute;
    top: 0;
    left: 90px;
    transform: translateX(-50%);
    border-top: 6px solid black;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }
  .parentRing {
    font-size: 0;
    height: 10px;
    width: 10px;
    position: absolute;
    top: 0;
    left: 90px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 1px solid gray;
    background: #ffffff;
  }
  .childLink {
    height: 10px;
    width: 10px;
    position: absolute;
    bottom: 0;
    left: 90px;
    transform: translate(-50%, 50%);
    border-radius: 50%;
    border: 1px solid gray;
    background: #ffffff;
    cursor: crosshair;
  }
}
.selected {
  background: rgba(227, 244, 255, 0.9) !important;
}
.connector {
  stroke: hsla(0, 0%, 50%, 0.6);
  stroke-width: 2px;
  fill: none;
}
.dragFrame {
  .dragFrameArea {
    width: 180px;
    height: 30px;
    background-color: hsla(0, 0%, 100%, 0.9);
    border: 1px dashed black;
    border-radius: 15px;
    font-size: 12px;
    -webkit-transition: background-color 0.2s;
    transition: background-color 0.2s;
  }
}
.dragLinkArrows {
  border-top: 6px solid black;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  z-index: -10;
}
</style>
