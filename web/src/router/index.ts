import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Author from '../views/Author.vue'
import Detail from '../views/Detail.vue'
import Admin from '../views/Admin.vue'
import New from '../views/New.vue'
import Login from '../views/Login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/author',
    name: 'Author',
    component: Author
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/new',
    name: 'New',
    component: New
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
