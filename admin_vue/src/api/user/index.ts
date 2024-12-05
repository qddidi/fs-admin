import request from "@/utils/http/index";
import { Form, QueryParams } from "./types/user.dto";

//获取用户列表
export const getDataList = (query: QueryParams) => {
    return request({
        url: "/user/list",
        method: "get",
        loading: false,
        params: query,
    });
};

//新增
export const addData = (data: Form) => {
    return request({
        url: "/user/createUser",
        data,
        method: "post",
    });
};

//更新
export const updateData = (data: Form) => {
    return request({
        url: "/user/updateUser",
        data,
        method: "put",
    });
};


//删除
export const deleteData = (id: number | number[]) => {
    return request({
        url: `/user/deleteUser/${id}`,
        method: "delete",
    });
};



//获取用户信息
export const getProfile = () => {
    return request({
        url: "/user/profile",
        method: "get",
        loading: false,
    });
};

//修改密码
export const updatePassword = (data: { oldPassword: string; newPassword: string }) => {
    return request({
        url: "/user/updatePassword",
        method: "put",
        data,
    });
};

//修改个人信息
export const updateUserInfo = (data: Form) => {
    return request({
        url: "/user/updateUserInfo",
        method: "put",
        data,
    });
};