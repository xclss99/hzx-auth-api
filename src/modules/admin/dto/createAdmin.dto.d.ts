interface CreateAdminDto {
  adminType: import('../enum').AdminType
  mobile: string
  username: string
  password: string
  creatorId: number
}