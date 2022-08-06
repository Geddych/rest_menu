import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/category/add',
      name: 'Добавить категорию',
      component: () => import('../views/createCategory.vue')
    },
    {
      path:'/category/:id',
      name:'Изменить позицию',
      component: () => import('../views/updateCategory.vue')
    },
    {
      path:'/position/add',
      name:'Добавить позицию',
      component: () => import('../views/PositionForm.vue')
    },
    {
      path:'/position/:id',
      name:'Изменить позицию',
      component: () => import('../views/updatePosition.vue')
    }
  ]
})

export default router
