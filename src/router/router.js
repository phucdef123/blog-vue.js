import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/index.vue'
import PostPage from '../components/post.vue'
import LoginPage from '../components/login.vue'
import RegisterPage from '../components/register.vue'
import forgotPassword from '../components/forgot-password.vue'
import editProfile from '../components/edit-profile.vue'
import pageDetail from '../components/page-detail.vue'
import callBack from '../components/GoogleSignIn.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/post',
    name: 'Post',
    component: PostPage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: forgotPassword
  },
  {
    path: '/edit-profile',
    name: 'edit-profile',
    component: editProfile,
    meta: { requiresAuth: true }
  },
  {
    path: '/page-detail/:id',
    name: 'page-detail',
    component: pageDetail
  },
  {
    path: '/callback',
    name: 'callback',
    component: callBack
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router

