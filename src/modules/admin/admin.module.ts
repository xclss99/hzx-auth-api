import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminEntity } from './entities/admin.entity'
import { AdminService } from './admin.service'
import { AdminController } from './admin.controller'

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
