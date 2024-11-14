import request from "@/utils/http/index";
import { MenuDto, MenuForm, QueryMenuParams } from "./types/menu.dto";
//获取路由及权限
export const getInfo = (data: MenuDto) => {
  return request({
    url: "/menu/getInfo",
    data,
    method: "post",
  });
};

//新增菜单
export const addMenu = (data: MenuForm) => {
  return request({
    url: "/menu/createMenu",
    data,
    method: "post",
  });
};

//获取菜单列表
export const getMenuList = (query: QueryMenuParams) => {
  return request({
    url: "/menu/list",
    method: "get",
    params: query,
  });
};

//删除菜单
export const deleteMenu = (menuId: number | number[]) => {
  return request({
    url: `/menu/deleteMenu/${menuId}`,
    method: "delete",
  });
};
//更新菜单
export const updateMenu = (data: MenuForm) => {
  return request({
    url: `/menu/updateMenu`,
    method: "put",
    data
  });
};





