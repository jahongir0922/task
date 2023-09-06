import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/ultrasound',
      name: 'ultrasound',
      meta: { requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ultrasound/Ultrasound.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      meta: { requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ultrasound/cart.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token') !== null
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next('/')
    }
  }
  next()
})

export default router
