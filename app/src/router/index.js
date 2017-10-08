import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home/Home'
import Login from '../components/Login/Login'
import Signup from '../components/Signup/Signup'
import MyPoll from '../components/User/MyPoll'
import auth from '../utils/auth'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      props: () => ({
        isLogin: auth.isAuthenticated()
      })
    },
    {
      path: '/login',
      component: Login,
      beforeEnter: (to, from, next) => {
        auth.isAuthenticated() ? next('/') : next({to})
      }
    },
    {
      path: '/signup',
      component: Signup,
      beforeEnter: (to, from, next) => {
        auth.isAuthenticated() ? next('/') : next({to})
      }
    },
    {
      path: '/mypolls',
      component: MyPoll,
      beforeEnter: (to, from, next) => {
        auth.isAuthenticated() ? next({to}) : next('/')
      }
    }
  ]
})
