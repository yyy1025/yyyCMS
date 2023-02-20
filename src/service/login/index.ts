import YYRequest from '..' //其实就是导出的YYRequest1实例对象
import { localCache } from '@/utils/cache'
import type { InternalAxiosRequestConfig } from 'axios'
import yyRequest1 from '..'
import CONFIG from '@/service/request/config'
import Headers from '@/global/headers'
const baseURL = CONFIG.BASE_URL
const headers = Headers.headers
export default function accountLoginRequest(Logindata) {
  //已经有了baseurl，headers，interceptors，timeout
  //还需要传入url，data，method
  console.log('进入到了请求里面，要发送请求了,请求地址是', baseURL, '/login')
  // console.log('请求数据格式', typeof Logindata)
  return YYRequest.post({
    baseURL,
    headers,
    url: '/login',
    data: JSON.stringify(Logindata)
  })
}
//根据id获取对应的权限，决定首页页面显示什么:在登录到跳转页面之前拿到这个权限信息
export function getUserPmsById(id: number) {
  //必须携带token进行请求，即需要授权
  console.log("根据用户id获取对应的角色，id是", id)
  const token = localCache.getCache("token")
  if (token) headers["token"] = token
  return YYRequest.get({
    baseURL,
    headers,
    //我们不需要每个单独模块的请求都加上Authorization，我们在封装的时候加一个拦截器即可
    // headers: {} as AxiosRequestHeaders, //这样会不对的吧？
    url: `/users/${id}`,
  })
}
export function getMenusByRoleid(roleid: number) {
  return YYRequest.request({
    // headers: {} as AxiosRequestHeaders,
    headers,
    url: `/role/${roleid}/menu`,
    method: 'GET'
  })
}
