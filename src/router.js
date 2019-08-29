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
      component: () => import('./views/WayFindingPage.vue')
    },
    {
      path: '/wayfinding/:index',
      alias: '/wayfinding',
      component: () => import('./views/WayFindingPage.vue'),
      children: [
        {
          path: '',
          component: () => import('./components/wayfinding/WayFindingDetail.vue')
        }
      ]
    },
    {
      path: '/simulator',
      component: () => import('./views/SimulatorPage.vue'),
      children: [
        {
          path: '1',
          alias: '',
          name: 'firstSimulator',
          component: () => import('./components/simulator/first.vue')
        },
        {
          path: '2',
          name: 'secondSimulator',
          component: () => import('./components/simulator/Second.vue')
        },
        {
          path: '3',
          name: 'thirdSimulator',
          component: () => import('./components/simulator/Third.vue')
        },
        {
          path: '4',
          name: 'fourthSimulator',
          component: () => import('./components/simulator/Fourth.vue')
        },
        {
          path: '5',
          name: 'fifthSimulator',
          component: () => import('./components/simulator/Fifth.vue')
        },
        {
          path: '6',
          name: 'sixthSimulator',
          component: () => import('./components/simulator/Sixth.vue')
        },
        {
          path: '7',
          name: 'seventhSimulator',
          component: () => import('./components/simulator/Seventh.vue')
        },
        {
          path: '7/data',
          component: () => import('./components/simulator/SeventhDataTable.vue')
        },
        {
          path: '7/daily',
          component: () => import('./components/simulator/SeventhDailyStudy.vue')
        },
        {
          path: '8',
          name: 'eighthSimulator',
          component: () => import('./components/simulator/Eighth.vue')
        }
      ]
    }
  ]
})
