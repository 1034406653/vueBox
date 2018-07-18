import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import PPageHome from '@/components/pPage/home'
import PPageAboutUs from '@/components/pPage/aboutUs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/pPage/home',
      children: [
        { path: 'pPage/home', name: 'PPageHome',component: PPageHome},
        { path: 'pPage/aboutUs', name: 'PPageAboutUs',component: PPageAboutUs},
      ]
    }
  ]
})
