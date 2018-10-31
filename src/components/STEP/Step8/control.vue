<template>
     <g>
        <foreignObject width="200px" height="30px" style="position: relative">
        <body xmlns="http://www.w3.org/1999/xhtml">
            <div class="control_menu">
                <span @click="sizeExpend">╋</span>
                <span @click="sizeShrink">一</span>
                <span @click="sizeInit">╬</span>
                <span :class="['sel_area', 'sel_area_ing'].indexOf(currentEvent) !== -1 ? 'sel_ing' : ''" @click="sel_area($event)">口</span>
                <span @click="fullScreen">{{ changeScreen }}</span>
            </div>
        </body>
        </foreignObject>
    </g>
</template>

<script>
export default {
  props: {
    currentEvent: {
      type: String,
      default: () => {
        "";
      }
    }
  },
  data() {
    return {
      changeScreen: "全"
    };
  },
  methods: {
    sizeExpend() {
      this.$emit("sizeExpend");
    },
    sizeShrink() {
      this.$emit("sizeShrink");
    },
    sizeInit() {
      this.$emit("sizeInit");
    },
    sel_area(e) {
      this.$emit("sel_area");
      e.preventDefault();
      e.stopPropagation();
      e.cancelBubble = true;
    },
    fullScreen() {
      if (this.changeScreen === "全") {
        this.changeScreen = "关";
        let root = document.getElementById("svgContent");
        root.webkitRequestFullScreen();
      } else {
        this.changeScreen = "全";
        document.webkitExitFullscreen();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.control_menu {
  height: 30px;
  width: 150px;
  background: #cccccc;
  justify-content: space-around;
  display: flex;
  user-select: none;
  span {
    height: 20px;
    width: 20px;
    cursor: pointer;
    border: 1px solid rgba(1, 1, 1, 0.2);
    display: block;
    border-radius: 50%;
    text-align: center;
    transform: translateY(5px);
  }
  span:hover {
    transform: scale(1.4);
    transform-origin: 50% 0;
  }
}
.sel_ing {
  color: #289de9;
  border: 1px solid #289de9 !important;
}
</style>
