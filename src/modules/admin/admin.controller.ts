import { Controller, Get } from '@nestjs/common'
import { AdminService } from './admin.service'
import { AdminEntity } from './entities/admin.entity'

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/')
  async findAll(): Promise<Http.ResponseBody<AdminEntity[]>> {
    const data = await this.adminService.findAll()
    return {
      data,
      message: 'find all admin successfully!'
    }
  }

  
}
