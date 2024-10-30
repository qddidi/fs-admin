import { RouteRecordRaw, Router } from "vue-router";
import useAppStore from "@/store/index"
import { filterBreadCrumb } from "./filterBreadCrumb";

//处理路由路径,返回`/`最后一级
export const dealRoutePath = (path: string) => {
    if (!path) return ''
    const pathArr = path.split('/')
    return pathArr.slice(-1)[0]
}

// 匹配views里面所有的.vue文件
const modules = import.meta.glob("../views/**/*.vue");
export const loadView = (view: any) => {
    let res;
    for (const path in modules) {
        const dir = path.split("views/")[1].split(".vue")[0];
        if (dir === view) {
            res = () => modules[path]();
        }
    }
    return res;
};


export const filterRoute = (data: any) => {
    data.forEach((item: any) => {
        if (item.children?.length > 0) {
            delete item.component;
            filterRoute(item.children);
        } else {
            item.component = loadView(item.component);
            // item.redirect = "/404";
        }
    });
    return data;
};


export const handleRouter = (router: Router) => {
    const writeLists = ["Login"];
    router.beforeEach(async (to, _from, next) => {

        if (writeLists.includes(to.name as string)) {
            next();
            return;
        }
        const appStore = useAppStore();
        if (appStore.menuList.length) {
            appStore.$patch({
                breadcrumbs: filterBreadCrumb(to.path, appStore.menuList),
            });

            appStore.addTags({ name: to.meta.title as string, path: to.path, fullpath: to.fullPath });
            to.meta?.catch && appStore.addCatchList(to.meta?.name as string)

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