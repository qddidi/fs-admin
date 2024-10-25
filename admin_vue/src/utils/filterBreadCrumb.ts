import { Breadcrumb, MenuList } from "@/store/types";
export const filterBreadCrumb = (path: string, menuList: MenuList[]) => {
    let paths = path.split("/");
    //去掉空元素
    paths = paths.filter((item) => item);
    const breadCrumbs: Breadcrumb[] = [];
    paths.forEach((item, index) => {
        breadCrumbs.push({
            name: getMenuTitle(item, menuList),
            //父菜单是不能点击的
            path: index === paths.length - 1 ? item : "",
        });
    });
    return breadCrumbs;
};

export const getMenuTitle = (path: string, menuList: MenuList[]): string => {
    for (let i in menuList) {
        if (menuList[i].path === path) {
            return menuList[i].meta.title!;
        }
        if (menuList[i].menu_type === 1) {
            return getMenuTitle(path, menuList[i].children) || ""
        }
    }
    return ''
};

