import request from "@/utils/http/index";
import { QueryParams } from "./types/log.dto";

//获取用户列表
export const getDataList = (query: QueryParams) => {
    return request({
        url: "/log/list",
        method: "get",
        loading: false,
        params: query,
    });
};