import CONFIG from '@/service/request/config';
import axios from 'axios'
import type { AxiosRequestHeaders } from 'axios'
import { localCache } from '@/utils/cache';
const baseURL = CONFIG.BASE_URL
const timeout = CONFIG.TIMEOUT
const headers: AxiosRequestHeaders = {
  'Content-Type': 'application/json',
  // "Authorization": 'Bearer' + localCache.getCache('token') ?? ''
  "Authorization": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImNvZGVyd2h5Iiwicm9sZSI6eyJpZCI6MSwibmFtZSI6Iui2hee6p-euoeeQhuWRmCJ9LCJpYXQiOjE2NzY4NzkzMjksImV4cCI6MTY3OTQ3MTMyOX0.GOgS081R0k5hrP6_nhu6eQX2RNeUGQVDA07OyTEZsFkQM71BbWPu0QJkDHw_TFj_sNg5EvY-4AgqAaGoWX3F2MmRcIfNyohM6lrE3fWi6_2XWAK7y9RWdT7UKeUpgkrH-5Bw2R9FkRwdS8fmE89za0mfu9GDIejOPPjMwzYBRpM"
} as AxiosRequestHeaders
const apis = axios.create({
  baseURL,
  timeout,
  headers,

})
export default apis
