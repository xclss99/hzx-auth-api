import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common'
import { AdminService } from './admin.service'
import { AdminEntity } from './entities/admin.entity'

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/')
  async findAll() {
    const data = await this.adminService.findAll()
    const len = data.length
    const res: Http.ResponseBody<AdminInfoBo[]> = {
      data,
      message: `Found ${len} admin${len > 1 ? 's' : ''}.`
    }
    return res
  }

  @Get('/:id')
  async findById(@Param('id') id: number): Promise<Http.ResponseBody<AdminEntity[]>> {
    const data = await this.adminService.findById(id)
    const len = data.length
    return {
      data,
      message: `Found ${len} admin${len > 1 ? 's' : ''} with id ${id} .`
    }
  }

  @Get('/mobile/:mobile')
  async findByMobile(@Param('mobile') mobile: string): Promise<Http.ResponseBody<AdminEntity[]>> {
    const data = await this.adminService.findByMobile(mobile)
    const len = data.length
    return {
      data,
      message: `Found ${len} admin${len > 1 ? 's' : ''} with mobile ${mobile} .`
    }
  }

  @Get('/username/:username')
  async findByUsername(@Param('username') username: string): Promise<Http.ResponseBody<AdminEntity[]>> {
    const data = await this.adminService.findByUsername(username)
    const len = data.length
    return {
      data,
      message: `Found ${len} admin${len > 1 ? 's' : ''} admin by username ${username} .`
    }
  }

  @Post('/')
  async create(@Body() createAdminDto: CreateAdminDto): Promise<Http.ResponseBody> {
    const newAdminId = await this.adminService.create(createAdminDto)
    return {
      message: `An admin with id ${newAdminId} was created.`
    }
  }

  @Put('/')
  async update(@Body() updateAdminDto: UpdateAdminDto): Promise<Http.ResponseBody> {
    await this.adminService.update(updateAdminDto)
    return {
      message: `An admin with id ${updateAdminDto.id} was updated.`
    }
  }
}
