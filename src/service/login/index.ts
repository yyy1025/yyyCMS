import YYRequest from '../' //其实就是导出的YYRequest1实例对象
import { localCache } from '@/utils/cache'
import type { InternalAxiosRequestConfig, AxiosRequestHeaders } from 'axios'
const headers: AxiosRequestHeaders = {
  'Content-Type': 'application/json'
} as AxiosRequestHeaders
export default function accountLoginRequest(Logindata) {
  //已经有了baseurl，headers，interceptors，timeout
  //还需要传入url，data，method
  console.log('进入到了请求里面，要发送请求了')
  return YYRequest.request({
    headers,
    url: '/login',
    data: Logindata,
    method: 'POST'
  })
}
//根据id获取对应的权限，决定首页页面显示什么:在登录到跳转页面之前拿到这个权限信息
export function getUserPmsById(id: number) {
  //必须携带token进行请求，即需要授权
  return YYRequest.request({
    // headers: {
    //   Authorization: localCache.getCache('token')
    // } as AxiosRequestHeaders,
    //我们不需要每个单独模块的请求都加上Authorization，我们在封装的时候加一个拦截器即可
    headers: {} as AxiosRequestHeaders, //这样会不对的吧？
    url: `/users/${id}`,
    method: 'GET'
  })
}
