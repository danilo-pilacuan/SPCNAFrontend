import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Users from '@/views/Users'
import WorkingArea from '@/views/WorkingArea'
import AdminCourses from '@/views/AdminCourses'
import Courses from '@/views/Courses'

Vue.use(VueRouter)

const routes = [
  {
    path :'/',
    component: Home
  },
  {
    path :'/login',
    component: Login
  },
  {
    path :'/register',
    component: Register
  },
  {
    path :'/usuarios',
    component: Users
  },
  {
    path :'/areatrabajo',
    component: WorkingArea
  },
  {
    path :'/administracionCursos',
    component: AdminCourses
  },
  {
    path :'/cursos',
    component: Courses
  },
  {
    path :'/cursosEstudiante',
    component: () => import('@/views/CoursesStudent.vue'),
  },
  {
    path :'/cursoEstudiante',
    component: () => import('@/views/StudentCourseView.vue'),
  },
  {
    path :'/leccionesEstudiante',
    component: () => import('@/views/LessonsStudent.vue'),
  },
  {
    path :'/actividadesEstudiante',
    component: () => import('@/views/TasksStudent.vue'),
  },
  {
    path :'/veractividad',
    component: () => import('@/views/TaskView.vue'),
  },
  {
    path :'/verleccion',
    name: 'verleccion',
    props: true,
    component: () => import('@/views/WorkingArea.vue'),
  },
  {
    path :'/i18n',
    name: 'i18n',
    props: true,
    component: () => import('@/components/HelloI18n.vue'),
  },
  {
    path :'/resolveractividad',
    name: 'resolveractividad',
    props: true,
    component: () => import('@/views/WorkingArea.vue'),
  },
  {
    path :'/about',
    component: () => import('@/views/About'),
  },
  {
    path: '/curso',
    component: () => import('@/views/CourseView.vue'),
    children: [
      {
        path :'',
        component: () => import('@/views/Overview'),
      },
      {
        path :'alumnos',
        component: () => import('@/views/Alumnos'),
      },
      {
        path :'lecciones',
        component: () => import('@/views/Lessons'),
      },
      {
        path :'actividades',
        component: () => import('@/views/Tasks'),
      },
      {
        path :'calificaciones',
        component: () => import('@/views/Scores'),
      },
      {
        path :'areatrabajo',
        name: 'areatrabajo',
        props: true,
        component: () => import('@/views/WorkingArea'),
      },
      {
        path :'about',
        component: () => import('@/views/About'),
      },
      {
        path :'editlesson',
        component: () => import('@/components/EditLesson'),
      },
      {
        path :'createtask',
        component: () => import('@/components/CreateTask'),
      },
      {
        path :'fileexplorer',
        component: () => import('@/components/FileExplorer'),
      },
    ]
  },

  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
