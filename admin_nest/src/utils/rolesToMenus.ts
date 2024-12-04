import { Menu } from "src/menu/entities/menu.entity";
import { Role } from "src/role/entities/role.entity";

export const rolesToMenus = (roles: Role[] = []) => {

    //根据id去重
    const menus: Record<string, Menu> = roles.reduce(
        (mergedMenus: Record<string, Menu>, role: Role) => {
            role.menus.forEach((menu: Menu) => {
                mergedMenus[menu.id] = menu;
            });
            return mergedMenus;
        },
        {},
    );
    return Object.values(menus)
}