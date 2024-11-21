import request from "@/utils/http/index";
import { QueryRoleParams, RoleForm } from "./types/role.dto";

//获取角色列表
export const getRoleList = (query: QueryRoleParams) => {
    return request({
        url: "/role/list",
        method: "get",
        params: query,
    });
};

//新增
export const addRole = (data: RoleForm) => {
    return request({
        url: "/role/createRole",
        data,
        method: "post",
    });
};

//更新
export const updateRole = (data: RoleForm) => {
    return request({
        url: "/role/updateRole",
        data,
        method: "put",
    });
};

//删除角色
export const deleteRole = (menuId: number | number[]) => {
    return request({
        url: `/role/deleteRole/${menuId}`,
        method: "delete",
    });
};