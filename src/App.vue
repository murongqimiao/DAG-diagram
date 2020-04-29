<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
.el-loading-mask.is-fullscreen {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
foreignObject {
  /* 解决foreignObject默认遮挡溢出部分导致的形变 */
  overflow: inherit;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: fadeInLeft;
}

</style>
