<template>
     <g>
        <foreignObject width="200px" height="30px" style="position: relative">
        <body xmlns="http://www.w3.org/1999/xhtml">
            <div class="control_menu">
                <span @click="sizeExpend">╋</span>
                <span @click="sizeShrink">一</span>
                <span @click="sizeInit">╬</span>
            </div>
        </body>
        </foreignObject>
    </g>
</template>

<script>
export default {
  methods: {
    sizeExpend() {
      this.$emit('sizeExpend')
    },
    sizeShrink() {
      this.$emit('sizeShrink')
    },
    sizeInit() {
      this.$emit('sizeInit')
    }
  }
};
</script>

<style lang="scss" scoped>
.control_menu {
  height: 30px;
  width: 100px;
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
</style>
