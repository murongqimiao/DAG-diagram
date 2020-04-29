// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import ElementUI from 'element-ui'
import store from './views/store'
import 'element-ui/lib/theme-chalk/index.css'
import DAGBoard from '../plugin/index'
// import DAGBoard from 'dag-board'

Vue.use(DAGBoard)
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
