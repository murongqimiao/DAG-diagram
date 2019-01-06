<template>
  <svg
  id="svgContent"
  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="1260" height="1029" data-spm-anchor-id="TODO.11007039.0.i6.12b64a9bcbXQmm">
        <g
        v-for="(item, i) in DataAll"
        :key="i" class="svgEach"
        :transform="`translate(${item.translate.left}, ${item.translate.top})`">
            <foreignObject width="180" height="30" >
            <body xmlns="http://www.w3.org/1999/xhtml" style="margin: 0">
              <div :class="choice.paneNode === i ? 'pane-node-content selected' : 'pane-node-content'">
                  <span class="icon icon-data"></span>
                  <span class="name">{{item.name}}</span>
                  <span :class="item.parentNode ? 'parentLink' : 'parentRing'">{{i}}</span>
                  <span :class="item.childNode ? 'childLink' : 'childRing'"></span>
              </div>
            </body>
          </foreignObject>
          <path
          class="connector"
          v-for="(each, n) in item.linkTo" :key="n"
          :d="computedLink(i, each, n)"
          ></path>
        </g>
        <g
        :transform="`translate(${dragFrame.posX}, ${dragFrame.posY})`"
        class="dragFrame">
          <foreignObject width="180" height="30" >
            <body xmlns="http://www.w3.org/1999/xhtml">
              <div
              v-show="currentEvent === 'dragPane'"
              class="dragFrameArea">
              </div>
            </body>
          </foreignObject>
        </g>
    </svg>
</template>
<script>
export default {
  methods: {
    computedLink(i, each, n) {
      const { left, top } = this.DataAll[i].translate; // 起点位置
      const aimObj = this.DataAll.find(item => item.id === each.id).translate; // 终点坐标
      /**
       * 关于贝塞尔曲线坐标公式直接看
       * https://brucewar.gitbooks.io/svg-tutorial/15.SVG-path%E5%85%83%E7%B4%A0.html
       * path里关于贝塞尔的部分
       * step5 整合以后的计算公式更清晰, 此处可以跳过
       */
      return `M 90 30  Q 90 ${(aimObj.top - top + 30) / 2} ${(aimObj.left -
        left +
        180) /
        2} ${(aimObj.top - top + 30) / 2} T ${aimObj.left -
        left +
        90} ${aimObj.top - top}`;
    }
  },
  data() {
    return {
      DataAll: [
        {
          name: "name1",
          description: "description1",
          id: 1,
          parentNode: 0,
          childNode: 2,
          imgContent: "",
          parentDetails: {
            a: "",
            b: ""
          },
          linkTo: [{ id: 2 }, { id: 3 }],
          translate: {
            left: 100,
            top: 20
          }
        },
        {
          name: "name2",
          description: "description1",
          id: 2,
          parentNode: 1,
          childNode: 2,
          imgContent: "",
          parentDetails: {
            a: "",
            b: ""
          },
          linkTo: [{ id: 5 }],
          translate: {
            left: 20,
            top: 100
          }
        },
        {
          name: "name3",
          description: "description1",
          id: 3,
          parentNode: 1,
          childNode: 2,
          imgContent: "",
          parentDetails: {
            a: "",
            b: ""
          },
          linkTo: [],
          translate: {
            left: 300,
            top: 150
          }
        },
        {
          name: "name4",
          description: "description1",
          id: 4,
          parentNode: 0,
          childNode: 2,
          imgContent: "",
          parentDetails: {
            a: "",
            b: ""
          },
          linkTo: [],
          translate: {
            left: 400,
            top: 250
          }
        },
        {
          name: "name5",
          description: "description1",
          id: 5,
          parentNode: 1,
          childNode: 2,
          imgContent: "",
          parentDetails: {
            a: "",
            b: ""
          },
          linkTo: [],
          translate: {
            left: 30,
            top: 300
          }
        },
        {
          name: "name4",
          description: "description1",
          id: 6,
          parentNode: 0,
          childNode: 2,
          imgContent: "",
          parentDetails: {
            a: "",
            b: ""
          },
          linkTo: [],
          translate: {
            left: 50,
            top: 400
          }
        },
        {
          name: "name4",
          description: "description1",
          id: 7,
          parentNode: 0,
          childNode: 2,
          imgContent: "",
          parentDetails: {
            a: "",
            b: ""
          },
          linkTo: [],
          translate: {
            left: 300,
            top: 300
          }
        }
      ],
      choice: {
        paneNode: -1, // 选取的节点下标
        index: -1
      },
      dragFrame: {
        posX: 0,
        posY: 0
      },
      dragLink: {
        fromX: 0,
        fromY: 0,
        toX: 0,
        toY: 0
      },
      currentEvent: null, // 当前执行的方法
      initPos: {
        left: -1,
        top: -1
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
  position: fixed;
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
.parentLink {
  font-size: 0;
  position: absolute;
  top: 0;
  left: 90px;
  transform: translateX(-50%);
  border-top: 6px solid black;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
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
