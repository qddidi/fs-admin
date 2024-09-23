import request from "@/utils/http/index";
import { MenuVo } from "./types/menu.vo";
//获取菜单列表
export const getMenuList = (data: any) => {
  return request({
    url: "/menu",
    params: data,
    method: "get",
  });
};

//新增菜单

export const addMenu = (data: MenuVo) => {
  return request({
    url: "/menu",
    data,
    method: "post",
  });
};

//更新菜单

export const updateMenu = (data: MenuVo) => {
  return request({
    url: "/menu",
    data,
    method: "put",
  });
};
