export enum AdminType {
  /** 超级管理员: 0 */
  Super,
  /** 普通管理员: 1 */
  Admin
}

export enum AdminExceptionCode {
  ADMIN_NOT_FOUND = 10001,
  ADMIN_ALREADY_EXISTS = 10002
}
