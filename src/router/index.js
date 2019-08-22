import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/views/HomePage'
import Example from '@/views/Example'
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
      name: 'Example',
      component: Example
    }
  ]
})
