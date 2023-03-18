import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AdminModule } from '@/modules/admin/admin.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { envConfigs } from '~/configs'

const {
  database: { type, host, port, username, password, database, synchronize, autoLoadEntities }
} = envConfigs

@Module({
  imports: [
    AdminModule,
    TypeOrmModule.forRoot({
      type,
      host,
      port,
      username,
      password,
      database,
      synchronize,
      autoLoadEntities
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
