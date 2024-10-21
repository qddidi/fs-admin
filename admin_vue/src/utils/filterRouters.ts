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
