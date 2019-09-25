import Vue from 'vue'
import Router from 'vue-router'
import guides_main from './views/guides_main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'guides_main',
      component: guides_main
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
