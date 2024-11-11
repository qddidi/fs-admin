import { Breadcrumb, MenuList } from "@/store/types";
export const filterBreadCrumb = (path: string, menuList: MenuList[]) => {
    let paths = path.split("/");

    //去空
    paths = paths.filter((item) => item);
    console.log({ paths });

    const breadCrumbs: Breadcrumb[] = [];
    paths.forEach((path) => {



        breadCrumbs.push({
            name: getMenuTitle(path, menuList),
        });
    });
    console.log({ breadCrumbs });

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

