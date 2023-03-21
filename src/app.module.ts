import { envConfigs } from '~/configs'
import { Module } from '@nestjs/common'
import { AuthModule } from '@/modules/auth/auth.module'
import { AdminModule } from '@/modules/admin/admin.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'

const {
  database: { type, host, port, username, password, database, synchronize, autoLoadEntities }
} = envConfigs

@Module({
  imports: [
    AuthModule,
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
  controllers: [AppController]
})
export class AppModule {}
