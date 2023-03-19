export enum AdminType {
  /** 超级管理员: 0 */
  Super,
  /** 普通管理员: 1 */
  Admin
}

export enum AdminExceptionCode {
  ADMIN_NOT_FOUND_ID = 10001,
  ADMIN_NOT_FOUND_MOBILE = 10002
}