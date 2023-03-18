import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AdminEntity } from './entities/admin.entity'

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>
  ) {}

  async findAll() {
    return await this.adminRepository.find()
  }

  async create(createAdminDto: CreateAdminDto) {
    const { adminType, mobile, username, password, creatorId } = createAdminDto
    const adminEntity = this.adminRepository.create({
      adminType,
      mobile,
      username,
      password,
      creatorId,
      updaterId: creatorId
    })
    return adminEntity.id
  }
}
