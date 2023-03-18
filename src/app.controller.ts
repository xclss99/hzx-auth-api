import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  constructor() {}

  @Get()
  greet(): string {
    return 'ok!!!'
  }
}
