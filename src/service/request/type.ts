//对AxiosRequestConfig类型进行接口继承扩展
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
//默认泛型是AxiosResponse
interface YYInterceptors<T = AxiosResponse> {
  requestSuccessFn: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestFailFn: (err: any) => any
  responseSuccessFn: (config: T) => T
  responseFailFn: (err: any) => any
}

export interface YYRequestConfig<T> extends InternalAxiosRequestConfig {
  //增加可选属性interceptors
  interceptors?: YYInterceptors<T>
}
//暴露新扩展的接口类型
// export default YYRequestConfig
// export default YYInterceptors
// export default {YYInterceptors,YYRequestConfig}//这两个仅仅是类型，不能当做值导出
