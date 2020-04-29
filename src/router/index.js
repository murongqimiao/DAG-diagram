/*
* 此文件读取所有一级目录并自动注册index.js
*/
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = function () {
  let all = []
  const requireRouter = require.context('../views/', true, /index.js/)
  /**
   * 读取当前路径子文件夹所有index.js
   */
  requireRouter.keys().forEach(fileName => {
    const requireConfig = requireRouter(fileName)
    const routerArr = requireConfig.default || requireConfig
    all = [...all, ...routerArr]
  })
  return all
}
export default new Router({
  // mode: 'history',
  routes: routes()
})
