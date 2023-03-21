interface AdminInfoBo {
  id: number
  adminType: import('~/enum').AdminType
  mobile: string
  username: string
  creatorId: number
  updaterId: number
  createTime: string
  updateTime: string
}
