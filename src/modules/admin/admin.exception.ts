import { HttpException } from '@nestjs/common/exceptions'
import { AdminExceptionCode } from './enum'

export class AdminNotFoundIdException extends HttpException {
  constructor() {
    super('admin not found by id', AdminExceptionCode.ADMIN_NOT_FOUND_ID)
  }
}

export class AdminNotFoundMobileException extends HttpException {
  constructor() {
    super('admin not found by mobile', AdminExceptionCode.ADMIN_NOT_FOUND_MOBILE)
  }
}