import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'

const role = sessionStorage.getItem('role')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: (routes) => setupLayouts(routes)
})

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  if (
    // make sure the user is authenticated
    !token &&
    // ❗️ Avoid an infinite redirect
    !to.path.includes('auth') &&
    !(to.path === '/') &&
    !(to.path === '/auth/register-success') &&
    !(to.path === '/about-us') &&
    !(to.path === '/faq') &&
    !(to.path === '/landing/shippers') &&
    !(to.path === '/landing/carriers')
  ) {
    // redirect the user to the login page
    return to.path.includes('admin')
      ? next({ path: '/admin/auth/login' })
      : to.path.includes('shipper')
        ? next({ path: '/shippers/auth/login' })
        : next({ path: '/carriers/auth/login' })
  } else if (token && role && to.path.includes('auth')) {
    return role === 'admin'
      ? next({ path: '/admin/advertisements' })
      : role === 'shipper'
        ? next({ path: '/shippers/advertisements' })
        : next({ path: '/carriers/advertisements' })
  } else {
    next()
  }
})

export default router
