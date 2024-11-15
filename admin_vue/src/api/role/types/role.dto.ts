import { MenuList } from "@/store/types";

export type RoleList = {
    id: number;
    role_name?: string;
    description?: string;
    order_num?: number;
    create_time: string;
    update_time: string;
    menus: MenuList[];
    status: number;
}

export type QueryRoleParams = {
    role_name?: string;
    status?: number | '';
    end_time?: string;
    begin_time?: string;
    page_num?: number;
    page_size?: number;
}

export type RoleForm = {
    id?: number;
    role_name: string;
    remark?: string;
    role_sort?: number;
    order_num?: number;
    menu_ids?: number[];
    status: number;

}