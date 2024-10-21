import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import { nextTick } from "vue";
import useHome from "@/store/index"
import { filterRoute } from "@/utils/filterRouters";

//const homeStore = useHome()
export const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/login/index.vue"),
  },
  {
    path: "/",
    name: "index",
    component: () =>
      import(/* webpackChunkName: "index" */ "@/layout/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {


    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  routes,
});

const writeLists = ["login"];
router.beforeEach(async (to, from, next) => {


  if (writeLists.includes(to.name as string)) {
    next();
    return;
  }

  await nextTick();
  const homeStore = useHome();
  if (homeStore.menuList.length) {
    next()
    return;
  }

  await homeStore.getInfo();
  const routers = filterRoute(homeStore.menuList);
  console.log(routers);

  routers.forEach((route: RouteRecordRaw) => {
    router.addRoute("index", route);
  });
  console.log({ routers });

  next({ ...to, replace: true });
});
export default router;
