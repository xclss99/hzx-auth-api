import { Entity, Column, Unique } from 'typeorm'
import { Length, IsNotEmpty, IsMobilePhone, IsStrongPassword } from 'class-validator'
import { AdminType } from '@/modules/admin/enum'
import { DetailedBaseEntity } from '~/entities'

@Entity('admin')
export class AdminEntity extends DetailedBaseEntity {
  /** 管理员类型, Super: 0, 超级管理员; Admin: 1 普通管理员 */
  @Column({
    type: 'tinyint',
    default: AdminType.Super,
    comment: '管理员类型, Super: 0, 超级管理员; Admin: 1 普通管理员'
  })
  @IsNotEmpty()
  adminType: AdminType

  /** 手机号, 唯一值, 必须为中国大陆地区手机号, 用作账号 */
  @Column({ comment: '手机号, 唯一值, 必须为中国大陆地区手机号, 用作账号' })
  @IsNotEmpty()
  @Unique(['mobile'])
  @IsMobilePhone('zh-CN')
  mobile: string

  /** 用户名, 唯一值, 长度8 ~ 16位, 用作账号 */
  @Column({ comment: '用户名, 唯一值, 长度8 ~ 16位, 用作账号' })
  @IsNotEmpty()
  @Length(2, 16)
  @Unique(['username'])
  username: string

  /** 密码, 长度8 ~ 16位, 必须为数字和大小写字母的组合 */
  @Column({ comment: '密码, 长度8 ~ 16位, 必须为数字和大小写字母的组合' })
  @IsNotEmpty()
  @Length(8, 16)
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minLowercase: 1
  })
  password: string
}
