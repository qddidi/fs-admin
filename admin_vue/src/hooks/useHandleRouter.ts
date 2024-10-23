import { RouteRecordRaw, Router } from "vue-router";
import useAppStore from "@/store/index"
import { filterRoute } from "@/utils/filterRouters";
import { nextTick } from "vue";
export const useHandleRouter = (router: Router) => {
    const writeLists = ["Login"];
    router.beforeEach(async (to, _from, next) => {
        if (writeLists.includes(to.name as string)) {


            next();
            return;
        }


        const appStore = useAppStore();
        if (appStore.menuList.length) {
            next()
            return;
        }
        try {
            await appStore.getInfo();
            const routers = filterRoute(appStore.menuList);

            routers.forEach((route: RouteRecordRaw) => {
                router.addRoute("Index", route);
            });

            //添加完路由需要重新执行一次路由跳转，否则会出现空白页面
            next({ ...to, replace: true });

        } catch (error) {
            next()
        }



    });
}