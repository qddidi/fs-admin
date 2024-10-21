import request from "@/utils/http/index";
import { MenuDto } from "./types/menu.dto";
//获取路由及权限
export const getInfo = (data: MenuDto) => {
  return request({
    url: "/menu/getInfo",
    data,
    method: "post",
  });
};

//新增菜单
export const addMenu = (data: any) => {
  return request({
    url: "/menu/createMenu",
    data,
    method: "post",
  });
};




