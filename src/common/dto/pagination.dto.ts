import { IsOptional, IsInt, IsPositive } from 'class-validator'

/** 分页dto */
export class PaginationDto<T> {
  /**
   * 第几页
   * @example 1
   */
  @IsOptional()
  @IsPositive({ message: 'page 必须大于0' })
  @IsInt({ message: 'page 必须为整数' })
  readonly page?: number

  /**
   * 每页数据条数
   * @example 10
   */
  @IsOptional()
  @IsPositive({ message: 'page 必须大于0' })
  @IsInt({ message: 'page 必须为整数' })
  readonly pageSize?: number

  /**
   * 总页数
   * @example 10
   */
  pages: number

  /**
   * 总条数
   * @example 100
   */
  total: number

  /**
   * 具体数据
   */
  data: T
}
