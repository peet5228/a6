import { createRouter, createWebHistory } from 'vue-router'
import RegisterForm from '@/RegisterForm.vue'
import LoginForm from '@/LoginForm.vue'
import UserLayout from '@/components/UserLayout.vue'

//staff
import Staff from '@/views/Staff/index.vue'

//Committee
import Committee from '@/views/Committee/index.vue'

//Evaluatee
import Evaluatee from '@/views/Evaluatee/index.vue'

import ManageEva from '@/views/Staff/ManageEva.vue'
import ManageCommit from '@/views/Staff/ManageCommit.vue'

import Edit_eva from '@/views/Evaluatee/Edit_eva.vue'
import Selfeva from '@/views/Evaluatee/Selfeva.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/regis',
      name: 'RegisterForm',
      component: RegisterForm,
    },
    {
      path: '/login',
      name: 'LoginForm',
      component: LoginForm,
    },
    {
      path: '/',
      redirect: '/login',
    },

    //Staff
    {
      path: '/Staff',
      component: UserLayout,
      children:[
        {
          path: '/Staff',
          name: 'Staff',
          component: Staff,
        },
        {
          path: '/ManageEva',
          name: 'ManageEva',
          component: ManageEva,
        },
        {
          path: '/ManageCommit',
          name: 'ManageCommit',
          component: ManageCommit,
        },
      ]
    },

    //Committee
    {
      path: '/Committee',
      component: UserLayout,
      children:[
        {
          path: '/Committee',
          name: 'Committee',
          component: Committee,
        },
      ]
    },

    //Evaluatee
    {
      path: '/Evaluatee',
      component: UserLayout,
      children:[
        {
          path: '/Evaluatee',
          name: 'Evaluatee',
          component: Evaluatee,
        },
        {
          path: '/Edit_eva',
          name: 'Edit_eva',
          component: Edit_eva,
        },
        {
          path: '/Selfeva',
          name: 'Selfeva',
          component: Selfeva,
        },
      ]
    },
  ],
})

export default router
