/**
 * 获取分页后的总页数
 * @param total
 * @param pageSize
 * @return pageCount
 */
export const getPageCount = (total: number, pageSize: number) => {
  const pageCount = Math.ceil(total / pageSize)
  return pageCount
}
