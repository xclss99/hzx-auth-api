import { HttpException } from '@nestjs/common/exceptions'
import { AdminExceptionCode } from './enum'

export class AdminNotFoundException extends HttpException {
  constructor(field: IdentifyField, value: string) {
    const message = `Admin not found with ${field} ${value} .`
    const status = AdminExceptionCode.ADMIN_NOT_FOUND
    super(message, status)
  }
}

export class AdminAlreadyExistsException extends HttpException {
  constructor(field: IdentifyField, value: string) {
    const message = `An admin with ${field} ${value} already exists.`
    const status = AdminExceptionCode.ADMIN_ALREADY_EXISTS
    super(message, status)
  }
}
