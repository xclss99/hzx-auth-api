interface UpdateAdminDto {
  id: number
  adminType: import('~/enum').AdminType
  mobile: string
  username: string
  updaterId: number
}
