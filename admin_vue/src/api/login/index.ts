import request from "@/utils/http/index";
import { LoginVo } from "./types/login.dto";
export const login = (data: LoginVo) => {
  return request({
    url: "/user/login",
    data,
    isToken: false,
    method: "post",
  });
};

//获取验证码
export const getCaptcha = () => {
  return request({
    url: "/user/captcha",
    isToken: false,
    method: "get",
  });
};
