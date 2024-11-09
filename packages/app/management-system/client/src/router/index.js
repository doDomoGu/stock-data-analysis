import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/layouts/default/index.vue'

import HomeView from '../views/home/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView,
        },
        // {
        //   path: '/about',
        //   name: 'about',
        //   // route level code-splitting
        //   // this generates a separate chunk (About.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import('../views/AboutView.vue'),
        // },
      ],
    },
    // {
    //   path: '/list',
    //   name: 'list',
    //   component: ListView,
    // },
  ],
})

export default router
