import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import Example from '@/components/Example'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/example',
      name: 'example',
      component: Example
    }
  ]
})
