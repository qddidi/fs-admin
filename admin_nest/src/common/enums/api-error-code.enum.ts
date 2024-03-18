export enum ApiErrorCode {
  SUCCESS = 200, // 成功
  USER_ID_INVALID = 10001, // 用户id无效
  USER_NOTEXIST = 10002, // 用户id无效
  COMMON_CODE = 20000, //通用错误码,想偷懒就返回这个
}
