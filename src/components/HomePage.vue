<template>
  <div class="page-content">
    <div class="tapBar">
      <div :class="item.sel ? 'tapEachSel ': 'tapEach'"  @click="selStep(i)" v-for="(item , i) in tap" :key="i">{{ item.name }}</div>
    </div>
    <div class="mainContent">
      <div class="nav">
        <div>假装是侧栏导航</div>
        <div>点击顶部导航,查看实现流程</div>
      </div>
      <div class="DAG-content">
        <Step1 v-if="tap[0].sel"/>
        <Step2 v-if="tap[1].sel"/>
        <Step3 v-if="tap[2].sel"/>
        <Step4 v-if="tap[3].sel"/>
        <Step5 v-if="tap[4].sel"/>
        <Step6 v-if="tap[5].sel"/>
      </div>
    </div>
  </div>
</template>

<script>
import { tap } from "./DataMainPage.js";
import Step from './STEP';

export default {
  data() {
    return {
      tap: tap
    };
  },
  methods: {
    selStep(i) {
      window.sessionStorage['step'] = i
      this.tap.forEach((item, n) => {
        i - n === 0 ? (item.sel = true) : (item.sel = false);
      });
      this.tap = JSON.parse(JSON.stringify(this.tap));
    }
  },
  mounted() {
    if (window.sessionStorage['step']) {
      const i = window.sessionStorage.step
      console.log(i)
      this.selStep(i)
    }
  },
  components: {
    ...Step
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-content {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.tapBar {
  width: 100%;
  height: 60px;
  background-color: #212528;
  display: flex;
  padding-top: 10px;
  padding-left: 300px;
}
.tapEach {
  height: 50px;
  line-height: 50px;
  text-align: center;
  width: 100px;
  color: #ffffff;
  cursor: pointer;
}
.tapEachSel {
  height: 50px;
  line-height: 50px;
  text-align: center;
  width: 100px;
  color: #212528;
  background: #cccccc;
  cursor: pointer;
  box-sizing: border-box;
}
.mainContent {
  width: 100%;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  text-align: left;
}
.mainContent .nav {
  width: 300px;
  background: #212528;
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
}
.mainContent .nav div {
  color: #ffffff;
  height: 50px;
  line-height: 50px;
  width: 100%;
  text-align: center;
}
.DAG-content {
  position: absolute;
  left: 300px;
  top: 0;
  bottom: 0;
  right: 0;
}
</style>
