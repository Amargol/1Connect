import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Dashboardb from '@/components/Dashboardb'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Hello
    },
    {
      path: '/employer/dashboard',
      component: Dashboardb
    }
  ]
})
