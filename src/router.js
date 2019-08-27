import Vue from 'vue'
import Router from 'vue-router'
import WayFindingDetail from "./components/wayfinding/WayFindingDetail";

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
      component: () => import('./views/SchedulerPage.vue'),
      props: {
        nextLink: '/scheduler/daily'
      }
    },
    {
      path: '/scheduler/before',
      name: 'beforeSchedule',
      component: () => import('./views/BeforeSchedulePage.vue'),
      props: {
        link: '/scheduler'
      }
    },
    {
      path: '/scheduler/daily',
      name: 'dailyStudy',
      component: () => import('./views/DailyStudyPage.vue'),
      props: {
        nextLink: '/scheduler'
      }
    },
    {
      path: '/wayfinding',
      name: 'wayfindingSearch',
      component: () => import('./views/WayFindingPage.vue')
    },
    {
      path: '/wayfinding/:index',
      component: () => import('./views/WayFindingPage.vue'),
      children: [
        {
          path: '',
          component: () => import('./components/wayfinding/WayFindingDetail.vue')
        }
      ]
    }
  ]
})
