import Vue from 'vue'
import Router from 'vue-router'
import cita from '@/components/citas/pedir'
import cita_index from '@/components/citas/index'
import cita_edit from '@/components/citas/edit'
import cita_create from '@/components/citas/create'

import especialistas_create from  '@/components/especialistas/create'
import especialistas_load from    '@/components/especialistas/update'
import especialistas_index from   '@/components/especialistas/index'


import especialidades_create from '@/components/especialidades/create'
import especialidades_load from   '@/components/especialidades/update'
import especialidades_index from  '@/components/especialidades/index'


import eps_create from '@/components/eps/create'
import eps_load from   '@/components/eps/update'
import eps_index from  '@/components/eps/index'

import users_create from '@/components/user/create'
import users_edit   from '@/components/user/update'
import users_index  from '@/components/user/index'

import patient_create from '@/components/patients/create'
import patient_edit   from '@/components/patients/update'
import patient_index  from '@/components/patients/index'

import horario_index from '@/components/horarios/index'
import horario_index2 from '@/components/horarios/index2'




import chagePass      from '@/components/user/changepass'
import logout         from '@/components/auth/logout'
import login          from '@/components/auth/login'
import sugerencias    from '@/components/sugerencias/index'
import sugerenciasShow from '@/components/sugerencias/show'
import privacidad from '@/components/sugerencias/privacidad'

import NotFound from '@/components/auth/NotFound'



Vue.use(Router)
//export default
let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/privacidad',
      name: '/privacidad',
      component: privacidad,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/sugerencias/index',
      name: 'sugerencias_index',
      component: sugerencias,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/sugerencias/view/:id',
      name: 'sugerencias_show',
      component: sugerenciasShow,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/',
      name: 'cita',
      component: cita,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/cita/index',
      name: 'cita_index',
      component: cita_index,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/cita/edit/:id',
      name: 'cita_edit',
      component: cita_edit,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/cita/create/',
      name: 'cita_create',
      component: cita_create,
      meta: {
        requiresAuth: true
      }
    },
    //Horario
    {
      path: '/horario/:id',
      name: 'horario_index',
      component: horario_index2,
      meta: {
        requiresAuth: true
      }
    },
    //Horario

    //Usuario
    {
      path: '/users/index',
      name: 'users_index',
      component: users_index,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/loguot',
      name: 'loguot',
      component: logout
    },
    {
      path: '/users/edit/:id',
      name: 'users_edit',
      component: users_edit,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/users/create/',
      name: 'users_create',
      component: users_create,
      meta: {
        requiresAuth: true
      }
    },
    //Usuario

    //Paciente
    {
      path: '/paciente/index',
      name: 'patient_index',
      component: patient_index,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/paciente/edit/:id',
      name: 'patient_edit',
      component: patient_edit,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/paciente/create/',
      name: 'patient_create',
      component: patient_create,
      meta: {
        requiresAuth: true
      }
    },
    //Paciente
    //AUTH

    {
      path: '/cambiarpass',
      name: 'chagePass',
      component: chagePass,
      meta: {
        requiresAuth: true
      }
    },
    //AUTH
    //especialistas
    {
      path: '/especialistas/new',
      name: 'especialistas_create',
      component: especialistas_create,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/especialistas/edit/:id',
      name: 'especialistas_load',
      component: especialistas_load,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/especialistas/',
      name: 'especialistas_index',
      component: especialistas_index,
      meta: {
        requiresAuth: true
      }
    },
    //especialistas
    //eps
    {
      path: '/eps/new',
      name: 'eps_create',
      component: eps_create,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/eps/edit/:id',
      name: 'eps_load',
      component: eps_load,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/eps/',
      name: 'eps_index',
      component: eps_index,
      meta: {
        requiresAuth: true
      }
    },
    //eps
    //Especialidades
    {
      path: '/especialidades/new',
      name: 'especialidades_create',
      component: especialidades_create,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/especialidades/edit/:id',
      name: 'especialidades_load',
      component: especialidades_load,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/especialidades/',
      name: 'especialidades_index',
      component: especialidades_index,
      meta: {
        requiresAuth: true
      }
    },
    //Especialidades
    //AUTH
    {
      path: '/login/',
      name: 'login',
      component: login
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound,
    }
    //AUTH
  ]
});

//=========================VALIDATE ROUTERS===============================//
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        name: 'login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  }
  else if((to.name=='login')&&(localStorage.getItem('jwt') != null)) {
    next({name: 'cita_index'});
  } else {
    next();
  }
})
//=========================VALIDATE ROUTERS===============================//
export default router
