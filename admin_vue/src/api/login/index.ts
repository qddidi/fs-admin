import request from "@/utils/http/index";
import { LoginVo } from "./types/login.vo";
export const login = (data: LoginVo) => {
  return request({
    url: "/auth/login",
    data,
    isToken: false,
    method: "post",
  });
};
