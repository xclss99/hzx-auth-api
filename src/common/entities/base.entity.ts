import {
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn
} from 'typeorm'

export abstract class BaseEntity {
  /** 自增主键 */
  @PrimaryGeneratedColumn({ comment: '自增主键' })
  id: number

  @UpdateDateColumn({ comment: '更新时间' })
  updateTime: Date

  @CreateDateColumn({ comment: '创建时间' })
  createTime: Date

  /** 软删除 */
  @Column({ type: 'boolean', default: false, select: false, comment: '软删除' })
  isDelete: boolean
}
