import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { AdminEntity } from './entities/admin.entity'
import {
  EntityNotFoundException,
  EntityAlreadyExistsException,
  InvalidMobileException,
  InvalidUsernameException,
  InvalidPasswordException
} from '~/exceptions'
import { isMobilePhone, isStrongPassword, length } from 'class-validator'

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>
  ) {}

  private async findAdminEntity(field: IdentifyField, value: string) {
    let adminEntities: AdminEntity[]
    const like = Like(`%${value}%`)
    switch (field) {
      case 'id':
        adminEntities = await this.adminRepository.createQueryBuilder().where(`id LIKE '%${value}%'`).getMany()
        break
      case 'mobile':
        adminEntities = await this.adminRepository.findBy({
          mobile: like
        })
        break
      case 'username':
        adminEntities = await this.adminRepository.findBy({
          username: like
        })
        break
    }
    return adminEntities
  }

  async findAll() {
    const adminEntities = await this.adminRepository.find()
    const adminInfoList: AdminInfoDto[] = adminEntities.map((item) => {
      const { id, adminType, mobile, username, updaterId, creatorId, updateTime, createTime } = item
      return {
        id,
        adminType,
        mobile,
        username,
        updaterId,
        creatorId,
        updateTime: updateTime.toLocaleString(),
        createTime: createTime.toLocaleString()
      }
    })
    return adminInfoList
  }

  async findById(id: number) {
    return await this.findAdminEntity('id', String(id))
  }

  async findByMobile(mobile: string) {
    return await this.findAdminEntity('mobile', mobile)
  }

  async findByUsername(username: string) {
    return await this.findAdminEntity('username', username)
  }

  async create(createAdminDto: CreateAdminDto) {
    const { mobile, username, password } = createAdminDto
    // check format
    if (!isMobilePhone(mobile, 'zh-CN')) {
      throw new InvalidMobileException(mobile)
    }
    if (!length(username, 2, 16)) {
      throw new InvalidUsernameException(username)
    }
    // check exists
    const adminByMobile = await this.adminRepository.findOneBy({ mobile })
    const adminByUsername = await this.adminRepository.findOneBy({ username })
    if (adminByMobile) {
      throw new EntityAlreadyExistsException('Admin', 'mobile', mobile)
    }
    if (adminByUsername) {
      throw new EntityAlreadyExistsException('Admin', 'username', username)
    }
    // check password format
    if (
      !isStrongPassword(password.toLocaleLowerCase(), { minLength: 8, minNumbers: 1, minLowercase: 1 }) ||
      !(password.length <= 16)
    ) {
      throw new InvalidPasswordException()
    }
    // create new admin
    createAdminDto.updaterId = createAdminDto.creatorId
    const adminEntity = await this.adminRepository.save(createAdminDto)
    return adminEntity.id
  }

  async update({ id, adminType, mobile, username, updaterId }: UpdateAdminDto) {
    const adminEntity = await this.adminRepository.findOneBy({ id })
    if (!adminEntity) {
      throw new EntityNotFoundException('Admin', 'id', String(id))
    }
    adminEntity.adminType = adminType
    adminEntity.mobile = mobile
    adminEntity.username = username
    adminEntity.updaterId = updaterId
    this.adminRepository.save(adminEntity)
  }
}
