import { http } from '@/utils'
import { UserBasic } from '@/types'

export function getUser () {
  return http.get<UserBasic>('/api/common/user')
}
