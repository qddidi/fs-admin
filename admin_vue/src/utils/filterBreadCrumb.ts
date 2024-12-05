import { Breadcrumb, MenuList } from "@/store/types";
export const filterBreadCrumb = (path: string, menuList: MenuList[]) => {
    let paths = path.split("/");

    //去空
    paths = paths.filter((item) => item);


    const breadCrumbs: Breadcrumb[] = [];
    paths.forEach((path) => {
        const breadName = getMenuTitle(path, menuList)
        if (!breadName) return;
        breadCrumbs.push({
            name: breadName,
        });
    });


    return breadCrumbs;
};

export const getMenuTitle = (path: string, menuList: MenuList[]): string => {

    for (let i in menuList) {


        if (menuList[i].path === path) {

            return menuList[i].meta.title!;
        }
        //如果是目录,递归查找子元素下path
        if (menuList[i].menu_type === 1) {
            const title = getMenuTitle(path, menuList[i].children) || ""
            if (title) {
                return title;
            }
        }
    }
    return ''
};

