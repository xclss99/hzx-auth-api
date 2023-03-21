import { Entity, Column, Unique } from 'typeorm'
import { Length, IsNotEmpty, IsMobilePhone, IsStrongPassword } from 'class-validator'
import { AdminType } from '@/modules/admin/enum'
import { DetailedBaseEntity } from '~/entities'

@Entity('admin')
export class AdminEntity extends DetailedBaseEntity {
  /** 管理员类型 (Super: 0, 超级管理员; Admin: 1 普通管理员) */
  @Column({
    type: 'tinyint',
    default: AdminType.Super,
    comment: '管理员类型 (Super: 0, 超级管理员; Admin: 1 普通管理员)'
  })
  @IsNotEmpty()
  adminType: AdminType

  /** 国内手机号 (前三位特殊格式, 后八位0~9, 长度11位, 唯一值, 用作账号) */
  @Column({ comment: '国内手机号 (前三位特殊格式, 后八位0~9, 长度11位, 唯一值, 用作账号)' })
  @IsNotEmpty()
  @Unique(['mobile'])
  @IsMobilePhone('zh-CN')
  mobile: string

  /** 用户名 (字母开头, 允许数字、字母和下划线, 不区分大小写, 长度3~16位, 用作账号) */
  @Column({ comment: '用户名 (字母开头, 允许数字、字母和下划线, 不区分大小写, 长度3~16位, 用作账号)' })
  @IsNotEmpty()
  @Length(2, 16)
  @Unique(['username'])
  username: string

  /** 密码 (只能为数字和字母的组合, 不区分大小写, 长度8~16位) */
  @Column({ comment: '密码 (只能为数字和字母的组合, 不区分大小写, 长度8~16位)' })
  @IsNotEmpty()
  @Length(8, 16)
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minLowercase: 1
  })
  password: string
}
