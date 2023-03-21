import { HttpStatus } from '@nestjs/common'
import { HttpException } from '@nestjs/common/exceptions'
import { ErrorCode } from '~/enum'

class ErrorResponse extends HttpException {
  constructor(responseBody: Http.ResponseBody) {
    super(responseBody, HttpStatus.OK)
  }
}

export class EntityNotFoundException extends ErrorResponse {
  constructor(entityName: string, field: KeyField, value: string) {
    const message = `${entityName} not found with ${field} '${value}' .`
    const code = ErrorCode.ENTITY_NOT_FOUND
    super({ code, message })
  }
}

export class EntityAlreadyExistsException extends ErrorResponse {
  constructor(entityName: string, field: KeyField, value: string) {
    const message = `${entityName} with ${field} '${value}' already exists.`
    const code = ErrorCode.ENTITY_ALREADY_EXISTS
    super({ code, message })
  }
}

export class InvalidMobileException extends ErrorResponse {
  constructor(mobile: string) {
    const message = `Invalid mobile '${mobile}' .`
    const code = ErrorCode.INVALID_MOBILE
    super({ code, message })
  }
}

export class InvalidUsernameException extends ErrorResponse {
  constructor(username: string) {
    const message = `Invalid username '${username}' .`
    const code = ErrorCode.INVALID_USERNAME
    super({ code, message })
  }
}

export class InvalidPasswordException extends ErrorResponse {
  constructor() {
    const message = `Invalid password.`
    const code = ErrorCode.INVALID_PASSWORD
    super({ code, message })
  }
}
