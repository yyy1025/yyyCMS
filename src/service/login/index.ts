import YYRequest from '../' //其实就是导出的YYRequest1实例对象
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
