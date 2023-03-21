import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminEntity } from '@/modules/admin/entities/admin.entity'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
