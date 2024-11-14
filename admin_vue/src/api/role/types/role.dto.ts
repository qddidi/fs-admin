
export type RoleList = {
    id: number;
    role_name?: string;
    description?: string;
    order_num?: number;
    create_time: Date;
    update_time: Date;
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