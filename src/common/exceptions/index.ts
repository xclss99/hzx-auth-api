import { HttpException } from '@nestjs/common/exceptions'
import { ExceptionCode } from '../enum'

export class EntityNotFoundException extends HttpException {
  constructor(entityName: string, field: IdentifyField, value: string) {
    const message = `${entityName} not found with ${field} '${value}' .`
    const status = ExceptionCode.ENTITY_NOT_FOUND
    super(message, status)
  }
}

export class EntityAlreadyExistsException extends HttpException {
  constructor(entityName: string, field: IdentifyField, value: string) {
    const message = `${entityName} with ${field} '${value}' already exists.`
    const status = ExceptionCode.ENTITY_ALREADY_EXISTS
    super(message, status)
  }
}

export class InvalidMobileException extends HttpException {
  constructor(mobile: string) {
    const message = `Invalid mobile '${mobile}' .`
    const status = ExceptionCode.INVALID_MOBILE
    super(message, status)
  }
}

export class InvalidUsernameException extends HttpException {
  constructor(username: string) {
    const message = `Invalid username '${username}' .`
    const status = ExceptionCode.INVALID_USERNAME
    super(message, status)
  }
}

export class InvalidPasswordException extends HttpException {
  constructor() {
    const message = `Invalid password.`
    const status = ExceptionCode.INVALID_PASSWORD
    super(message, status)
  }
}
