import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Admin } from './entities/admin.entity'

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly admin: Repository<Admin>
  ) {}

  async findAll() {
    return await this.admin.find()
  }
}
