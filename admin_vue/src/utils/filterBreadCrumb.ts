import { Breadcrumb, MenuList } from "@/store/types";
export const filterBreadCrumb = (path: string, menuList: MenuList[]) => {
    let paths = path.split("/");
    //去空
    paths = paths.filter((item) => item);
    const breadCrumbs: Breadcrumb[] = [];
    paths.forEach((item) => {
        breadCrumbs.push({
            name: getMenuTitle(item, menuList),
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

