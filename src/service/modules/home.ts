import YYRequest from '../request'
//对于modules里面的接口便于管理
//新建这个index是为了便于导入那些接口，因为会自动扫描这个index
// export * from "./modules/city"
//全局的axios请求//分接口的请求在modules里面
import type { InternalAxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import CONFIG from '../request/config'
const baseURL = CONFIG.BASE_URL
const timeout = CONFIG.TIMEOUT
const headers: AxiosRequestHeaders = {
  'Content-Type': 'application/json'
} as AxiosRequestHeaders
const config = {
  baseURL,
  timeout,
  headers,
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
}
interface HomeData {
  data: any
  status: number
  success: boolean
}
const yyRequest2 = new YYRequest(config)
yyRequest2
  .request<HomeData>({
    url: '',
    headers,
    interceptors: {
      //必须得都实现吗？不可以只实现其中的某些吗
      requestSuccessFn: (config) => config,
      requestFailFn(err) {},
      responseSuccessFn: (config) => config,
      responseFailFn(err) {}
    }
  })
  .then((res) => {
    console.log(res.data)
  })
export default yyRequest2
//返回的是异步请求，在外使用的时候通过.then获取返回值
