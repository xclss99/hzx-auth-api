import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AdminEntity } from './entities/admin.entity'
import { AdminNotFoundIdException } from './admin.exception'

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>
  ) {}

  async findAll() {
    return await this.adminRepository.find()
  }

  async create({ adminType, mobile, username, password, creatorId }: CreateAdminDto) {
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

  async update({ adminId, adminType, mobile, username, updaterId }: UpdateAdminDto) {
    const adminEntity = await this.adminRepository.findOneBy({ id: adminId })
    if (!adminEntity) {
      throw new AdminNotFoundIdException()
    }
    adminEntity.adminType = adminType
    adminEntity.mobile = mobile
    adminEntity.username = username
    adminEntity.updaterId = updaterId
    this.adminRepository.save([adminEntity])
  }
}
