import { http } from '@/utils'

interface UserBasic {
  id: number
  nick: string
  name: string
  avatar: string
}

export function getUser () {
  return http.get<UserBasic>('/api/common/user')
}
