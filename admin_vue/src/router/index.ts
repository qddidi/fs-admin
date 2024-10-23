import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { useHandleRouter } from "@/hooks/useHandleRouter";
export const routes: RouteRecordRaw[] = [
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
useHandleRouter(router)
export default router;
