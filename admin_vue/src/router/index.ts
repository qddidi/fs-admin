import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { handleRouter } from "@/utils/routeUtils";
export const routes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: () => import(/* webpackChunkName: "index" */ "@/layout/index.vue"),
    children: [
      {
        path: ':path(.*)',
        component: () => import(/* webpackChunkName: "redirect" */'@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: "/",
    name: "Index",
    redirect: '/index',
    component: () =>
      import(/* webpackChunkName: "index" */ "@/layout/index.vue"),
    children: [
      {
        path: '/index',
        component: () => import('@/views/index.vue'),
        name: 'Home',
        meta: { title: '首页' }
      },
      {
        path: "/profile",
        name: "Profile",
        meta: { title: '个人中心' },
        component: () =>
          import(/* webpackChunkName: "profile" */ "@/views/profile/index.vue"),
      }
    ]
  }, {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/login/index.vue"),
  },

  {
    path: "/:pathMatch(.*)*",
    component: () => import('@/views/error/404.vue'),
  },

];
const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  routes,
});
handleRouter(router)
export default router;
