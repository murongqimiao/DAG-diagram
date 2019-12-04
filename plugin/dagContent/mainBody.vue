<template>
    <!-- 正常竖版 -->
    <foreignObject v-if="isVertical()" width="180" height="30" >
              <body xmlns="http://www.w3.org/1999/xhtml" style="margin: 0" >
              <div>
                <div :style="item.nodeStyle" :class="choice.paneNode.indexOf(item.id) !== -1 ? 'pane-node-content selected' : 'pane-node-content'">
                    <i
                    @dblclick="$emit('nodesPersonalEvent', 'dbClickNodeIcon', item.id)"
                    :style="item.iconStyle" :class="`${item.iconClassName || 'el-icon-coin'} icon icon-data`"></i>
                    <input
                    type="text" class="name"
                    v-model="item.name"
                    @change="$emit('changeNodeName', item)">
                </div>
                <p v-if="choice.paneNode.indexOf(item.id) !== -1" class="node-pop">{{item.nameDescribe || item.name}}</p>
                <div :class="currentEvent === 'dragLink' ? 'pane-node-parent-hl' : 'pane-node-parent' ">
                  <div v-for="(poi, nth) in item.in_ports" :key="'__' + nth" :style="{width: `${ 100 / (item.in_ports.length + 1)}%`}">
                    <span
                    class="space"
                    @mouseup="$emit('linkEnd', i, nth)"></span>
                  </div>
                </div>
                <div class="pane-node-children">
                  <div v-for="(poi, nth) in item.out_ports" :key="'___' + nth" :style="{width: `${ 100 / (item.out_ports.length + 1)}%`}">
                    <span
                    class="space"
                    @mousedown="$emit('linkPre', $event, i, nth)"></span>
                  </div>
                </div>
              </div>
              </body>
    </foreignObject>
    <!-- 横版 -->
    <foreignObject v-else width="180" height="30" >
              <body xmlns="http://www.w3.org/1999/xhtml" style="margin: 0" >
              <div>
                <div :style="item.nodeStyle" :class="choice.paneNode.indexOf(item.id) !== -1 ? 'pane-node-content selected' : 'pane-node-content'">
                    <i
                    @dblclick="$emit('nodesPersonalEvent', 'dbClickNodeIcon', item.id)"
                    :style="item.iconStyle" :class="`${item.iconClassName || 'el-icon-coin'} icon icon-data`"></i>
                    <input
                    type="text" class="name"
                    v-model="item.name"
                    @change="$emit('changeNodeName', item)">
                </div>
                <p v-if="choice.paneNode.indexOf(item.id) !== -1" class="node-pop">{{item.nameDescribe || item.name}}</p>
                <div id="parent-cross" :class="currentEvent === 'dragLink' ? 'pane-node-parent-hl' : 'pane-node-parent' ">
                  <div v-for="(poi, nth) in item.in_ports" :key="'__' + nth" :style="{width: `${ 100 / (item.in_ports.length + 1)}%`}">
                    <span
                    class="space"
                    @mouseup="$emit('linkEnd', i, nth)"></span>
                  </div>
                </div>
                <div id="children-cross" class="pane-node-children">
                  <div v-for="(poi, nth) in item.out_ports" :key="'___' + nth" :style="{width: `${ 100 / (item.out_ports.length + 1)}%`}">
                    <span
                    class="space"
                    @mousedown="$emit('linkPre', $event, i, nth)"></span>
                  </div>
                </div>
              </div>
              </body>
    </foreignObject>
</template>

<script>
    export default {
        props: {
            item: {
                type: Object,
                default: () => {}
            },
            choice: {
                type: Object,
                default: () => {}
            },
            currentEvent: {
                type: String,
                default: () => ''
            },
            i: {
                type: Number,
                default: () => 0
            }
        },
        data() {
            return {
            }
        },
        methods: {
          isVertical() {
            let GlobalConfig = { isVertical: true }
            let _GlobalConfig = localStorage.getItem('GlobalConfig')
            if (_GlobalConfig && _GlobalConfig.length > 0) {
              GlobalConfig = Object.assign(GlobalConfig, JSON.parse(_GlobalConfig))
            }
            return GlobalConfig.isVertical
          }
        }
    }
</script>

<style scoped>
.pane-node-content {
  box-sizing: border-box;
  width: 180px;
  height: 30px;
  background-color: hsla(0, 0%, 100%, 0.9);
  border: 1px solid #289de9;
  border-radius: 15px;
  font-size: 12px;
  -webkit-transition: background-color 0.2s;
  transition: background-color 0.2s;
}
.pane-node-content .icon {
    width: 26px;
    height: 26px;
    margin: 1px;
    border-radius: 100%;
    float: left;
    color: #fff;
    font-size: 26px;
    background-color: #289de9;
    cursor: pointer;
}
.pane-node-content  .parentLink {
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
.pane-node-content  .childLink {
  height: 10px;
  width: 10px;
  position: absolute;
  bottom: 0;
  left: 90px;
  transform: translate(-50%, 50%);
  border-radius: 50%;
  background: #ffffff;
  cursor: crosshair;
}
.pane-node-content .name {
  float: left;
  margin-left: 2px;
  width: 135px;
  line-height: 28px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  height: 26px;
  background: transparent;
  border: none;
}
.pane-node-parent-hl {
  position: fixed;
  top: -5px;
  height: 10px;
  width: 100%;
  display: flex;
  transform: translateX(6px);
}
.pane-node-parent-hl .space {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid gray;
    background: #ffffff;
    position: absolute;
    right: 0;
    top: 0;
    cursor: crosshair;
}
.pane-node-parent-hl .space:hover {
  box-shadow: 0 0 0 6px #3ddd73;
}
.paneSuccess {
  background: #3ddd73 !important;
}
.pane-node-parent-hl > div {
  position: relative;
  display: inline-block;
}
#parent-cross {
  top: 0px ;
  height: 100% ;
  width: 10px ;
  left: -10px ;
}
#parent-cross .space {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
}
#children-cross {
    top:0px;
    right: 0;
    height: 100%;
    width: 10px;
    position: fixed;
}
#children-cross .space{
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
}

.node-pop {
  position: absolute;
  right: -30px;
  top: -100px;
  border: 1px solid #ccc;
  padding: 10px 20px;
  border-radius: 30px 20px;
  background: #fff;
  pointer-events: none;
}
.node-pop:after {
    content: '.';
    font-size: 0;
    height: 20px;
    width: 20px;
    background: #fff;
    border: 2px #ccc solid;
    border-top: none;
    border-right: none;
    z-index: 100;
    position: absolute;
    transform: rotate(-34deg) skew(-33deg, -1deg) scale(1.5);
    border-radius: 20px 0 0 0;
    left: -14px;
    top: 22px;
    pointer-events: none;
}
.pane-node-parent {
  position: fixed;
  top: -5px;
  height: 10px;
  width: 100%;
  display: flex;
  opacity: 0;
  transform: translateX(6px);
}
.pane-node-parent .space {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid gray;
    background: #ffffff;
    position: absolute;
    right: 0;
    top: 0;
}

.pane-node-parent > div {
  position: relative;
  display: inline-block;
}

.pane-node-children {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  opacity: 0;
  transform: translateX(6px);
}
.pane-node-children .space{
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid gray;
    background: #ffffff;
    position: absolute;
    right: 0px;
    bottom: -6px;
    cursor: crosshair;
}

.pane-node-children .space {
   background: #cccccc;
}
.pane-node-children:hover {
  opacity: 1;
}

.pane-node-children > div {
  position: relative;
  display: inline-block;
}

.selected {
  background: rgba(227, 244, 255, 0.9) !important;
}
</style>
