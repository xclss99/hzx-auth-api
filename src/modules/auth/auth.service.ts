import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AdminEntity } from '@/modules/admin/entities/admin.entity'
import { Repository } from 'typeorm'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>
  ) {
    console.log(this.adminRepository)
  }

  async passwordLogin({ accountType, account, password }: PasswordLoginDto) {
    console.log(`password login`, accountType, account, password)
  }

  async verifyCodeLogin({ mobile, verifyCode }: VerifyCodeLoginDto) {
    console.log(`verify code login`, mobile, verifyCode)
  }
}
