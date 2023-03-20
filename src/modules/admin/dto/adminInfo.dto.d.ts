interface AdminInfoDto {
  id: number
  adminType: import('../enum').AdminType
  mobile: string
  username: string
  updaterId: number
  creatorId: number
  updateTime: string
  createTime: string
}
