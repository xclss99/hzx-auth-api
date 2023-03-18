import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'

const start = async () => {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger()
  })
  await app.listen(3000)
}

start()
