import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AdminEntity } from './entities/admin.entity'
import { Like, Repository } from 'typeorm'
import {
  EntityNotFoundException,
  EntityAlreadyExistsException,
  InvalidMobileException,
  InvalidUsernameException,
  InvalidPasswordException
} from '~/exceptions'
import { isMobileCN, isUsername, isPassword } from '~/utils'

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>
  ) {}

  private async findAdminEntity(field: KeyField, value: string) {
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
    const adminInfoList: AdminInfoBo[] = adminEntities.map((item) => {
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
    // check mobile and username format
    if (!isMobileCN(mobile)) {
      throw new InvalidMobileException(mobile)
    }
    if (!isUsername(username)) {
      throw new InvalidUsernameException(username)
    }
    // check mobile and username exists
    const adminByMobile = await this.adminRepository.findOneBy({ mobile })
    const adminByUsername = await this.adminRepository.findOneBy({ username })
    if (adminByMobile) {
      throw new EntityAlreadyExistsException('Admin', 'mobile', mobile)
    }
    if (adminByUsername) {
      throw new EntityAlreadyExistsException('Admin', 'username', username)
    }
    // check password format
    if (!isPassword(password)) {
      throw new InvalidPasswordException()
    }
    // check admin exists with creatorId
    const { creatorId } = createAdminDto
    const creator = await this.adminRepository.findOneBy({ id: creatorId })
    if (!creator) {
      throw new EntityNotFoundException('Creator of Admin', 'id', String(creatorId))
    }
    // create new admin
    createAdminDto.updaterId = creatorId
    const adminEntity = await this.adminRepository.save(createAdminDto)
    return adminEntity.id
  }

  async update({ id, adminType, mobile, username, updaterId }: UpdateAdminDto) {
    // check admin exists with id and updaterId
    const adminEntity = await this.adminRepository.findOneBy({ id })
    if (!adminEntity) {
      throw new EntityNotFoundException('Admin', 'id', String(id))
    }
    const updater = await this.adminRepository.findOneBy({ id: updaterId })
    if (!updater) {
      throw new EntityNotFoundException('Updater of Admin', 'id', String(id))
    }
    // check mobile and username format
    if (!isMobileCN(mobile)) {
      throw new InvalidMobileException(mobile)
    }
    if (!isUsername(username)) {
      throw new InvalidUsernameException(username)
    }
    adminEntity.adminType = adminType
    adminEntity.mobile = mobile
    adminEntity.username = username
    adminEntity.updaterId = updaterId
    this.adminRepository.save(adminEntity)
  }
}
