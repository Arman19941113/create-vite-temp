import { http } from '@/utils'
import { UserBasic } from '@/types'
import { catchError } from '@/utils/business'

export function getUser() {
  return http.get<UserBasic>('/api/common/user')
}

getUser().catch((e: unknown) => catchError('getUser error', e))
