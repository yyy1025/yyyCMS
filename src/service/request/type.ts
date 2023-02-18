//对AxiosRequestConfig类型进行接口继承扩展
import type {
  InternalAxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults
} from 'axios'
//默认泛型是AxiosResponse
export interface YYInterceptors<T = AxiosResponse> {
  requestSuccessFn: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestFailFn: (err: any) => any
  responseSuccessFn: (config: T) => T
  responseFailFn: (err: any) => any
}
// 使用CreateAxiosDefaults可以创建Axios实例，给axios创建默认配置
export interface CreateRequestConfig<T = AxiosResponse>
  extends CreateAxiosDefaults {
  interceptors?: YYInterceptors
}

export interface YYRequestConfig<T = InternalAxiosRequestConfig>
  extends InternalAxiosRequestConfig {
  //增加可选属性interceptors
  interceptors?: YYInterceptors<T>
}
export interface CancelRequestConfig<T = InternalAxiosRequestConfig> {
  [index: string]: () => void
}
//暴露新扩展的接口类型
// export default YYRequestConfig
// export default YYInterceptors
// export default {YYInterceptors,YYRequestConfig}//这两个仅仅是类型，不能当做值导出
