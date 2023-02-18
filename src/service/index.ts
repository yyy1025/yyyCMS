//对于modules里面的接口便于管理
//新建这个index是为了便于导入那些接口，因为会自动扫描这个index
// export * from "./modules/city"
//全局的axios请求//分接口的请求在modules里面
import type { InternalAxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import YYRequest from './request'
import { localCache } from '@/utils/cache'
import CONFIG from './request/config'
const baseURL = CONFIG.BASE_URL
const timeout = CONFIG.TIMEOUT

const headers: AxiosRequestHeaders = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer' + localCache.getCache('token') ?? ''
} as AxiosRequestHeaders
// YYRequest类型的配置对象
const config1 = {
  baseURL, //公用baseurl的话那么需要传入一个url，但是不一定都公用这个baseurl
  timeout,
  headers, //这是YYRequest类型的灵魂
  interceptors: {
    requestSuccessFn: (config) => {
      console.log('xxx的请求被成功拦截')
      const token = localCache.getCache('token')
      if (config.headers && token) {
        config.headers.Authorization = 'Bearer' + token
      }
      return config
    },
    requestFailFn: (err) => {
      console.log('xxx的请求被拦截失败')
      return err
    },
    responseSuccessFn: (config) => {
      console.log('xxx的响应被成功拦截')
      return config
    },
    responseFailFn: (err) => {
      console.log('xxx的响应被拦截失败')
      return err
    }
  }
}
// 传入的是YYRequest类型的配置对象
const yyRequest1 = new YYRequest({
  baseURL, //公用baseurl的话那么需要传入一个url，但是不一定都公用这个baseurl
  timeout,
  headers: {
    'Content-Type': 'application/json'
  } as AxiosRequestHeaders,
  interceptors: {
    requestSuccessFn: (config) => {
      const internalConfig = config as InternalAxiosRequestConfig
      console.log('xxx的请求被成功拦截')
      return internalConfig
    },
    requestFailFn: (err) => {
      console.log('xxx的请求被拦截失败')
      return err
    },
    responseSuccessFn: (config) => {
      console.log('xxx的响应被成功拦截')
      return config
    },
    responseFailFn: (err) => {
      console.log('xxx的响应被拦截失败')
      return err
    }
  }
})
export default yyRequest1
