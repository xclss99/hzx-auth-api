import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import { HttpExceptionFilter } from '~/filters/http-exception/http-exception.filter'

const start = async () => {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger()
  })
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(3000)
}

start()
