import type { AxiosRequestHeaders } from 'axios'
import { localCache } from '@/utils/cache'
const headers: AxiosRequestHeaders = {
  'Content-Type': 'application/json',
  "Authorization": 'Bearer' + localCache.getCache('token') ?? ''
} as AxiosRequestHeaders
export default { headers }
