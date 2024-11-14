import { Menu } from "src/menu/entities/menu.entity";
import { Role } from "src/role/entities/role.entity";

export const rolesToMenus = (roles: Role[] = []) => {
    interface MenuMap {
        [key: string]: Menu;
    }

    //根据id去重
    const menus: MenuMap = roles.reduce(
        (mergedMenus: MenuMap, role: Role) => {
            role.menus.forEach((menu: Menu) => {
                mergedMenus[menu.id] = menu;
            });
            return mergedMenus;
        },
        {},
    );
    return Object.values(menus)
}