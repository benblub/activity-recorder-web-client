import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Settings from "../views/Settings";
import CreateActivity from "../views/Activity/CreateActivity";
import UpdateActivity from "../views/Activity/UpdateActivity";
import Login from "../components/Login";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/activity/create',
    name: 'CreateActivity',
    component: CreateActivity
  },
  {
    path: '/activity/update/:id',
    name: 'UpdateActivity',
    component: UpdateActivity
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
