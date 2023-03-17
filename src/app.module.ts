import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Admin } from '@/modules/admin/entities/admin.entity'
import { AdminModule } from '@/modules/admin/admin.module'
import { AdminService } from '@/modules/admin/admin.service'
import { AdminController } from '@/modules/admin/admin.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { envConfigs } from '~/configs'

const {
  database: { type, host, port, username, password, database, synchronize }
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
      entities: [Admin],
      synchronize
    })
  ],
  controllers: [AppController, AdminController],
  providers: [AppService, AdminService]
})
export class AppModule {}
