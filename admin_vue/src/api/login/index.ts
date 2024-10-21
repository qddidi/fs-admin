import request from "@/utils/http/index";
import { LoginDto } from "./types/login.dto";
export const login = (data: LoginDto) => {
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
    loading: false,
    method: "get",
  });
};
