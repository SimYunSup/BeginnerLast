import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('./views/MainPage.vue')
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/RegisterPage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/LoginPage.vue')
    },
    {
      path: '/scheduler',
      name: 'scheduler',
      component: () => import('./views/SchedulerPage.vue')
    },
    {
      path: '/scheduler/before',
      name: 'beforeSchedule',
      component: () => import('./views/BeforeSchedulePage.vue'),
      props: {
        link: '/scheduler'
      }
    }
  ]
})
