import axios from 'axios'
import AxiosHeaders from 'axios'
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders
} from 'axios'
//因为是一种类型，必须使用仅类型导入进行导入。
import type { YYRequestConfig, YYInterceptors } from './type'
class YYRequest {
  //创建axios实例
  _instance: AxiosInstance
  //传入的config中的拦截器对象们
  interceptorsObj?: YYInterceptors
  //存放取消控制器的map
  abortControllerMap: Map<String, AbortController>
  //每个人传过来的参数不一定一样，怎么办呢，那我们就直接传config对象
  constructor(config: YYRequestConfig<AxiosResponse>) {
    console.log('现在到了构建YYRequest实例的时候，执行constructor')
    //设置当前的baseUrl
    //不存在属性instance
    this._instance = axios.create(config)
    //初始化取消请求控制器的map
    this.abortControllerMap = new Map()
    //接收拦截器对象们
    this.interceptorsObj = config.interceptors
    //给每个instance实例都添加拦截器
    //添加全局请求拦截器
    //请求拦截器对请求添加请求数据
    this._instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        //对config添加loading、token、配置
        console.log('全局请求成功的拦截')
        return config
      },
      (err: any) => {
        console.log('全局请求失败的拦截')
      }
    )
    //添加全局响应拦截器
    this._instance.interceptors.response.use(
      (res: AxiosResponse) => {
        //响应拦截器接收响应结果
        return res.data
      },
      (err: any) => {}
    )
    //针对xxx请求实例的请求拦截器
    if (config.interceptors) {
      this._instance.interceptors.request.use(
        this.interceptorsObj?.requestSuccessFn,
        this.interceptorsObj?.requestFailFn
      )
      this._instance.interceptors.response.use(
        this.interceptorsObj?.responseSuccessFn,
        this.interceptorsObj?.responseFailFn
      )
    }
  }
  // constructor(baseURL:string, timeout:number,headers:any) {
  //设置当前的baseUrl
  //不存在属性instance
  // this._instance = axios.create({
  //   baseURL,
  //   timeout
  // })
  // }

  //封装网络请求的方法
  //request方法
  request<T = any>(config: YYRequestConfig<T>): Promise<T> {
    //设置单个请求的拦截器，这里使用单个请求的拦截器
    console.log('现在到了调用request方法的时候')
    if (config.interceptors?.requestSuccessFn) {
      //请求成功有值的话,调用拦截器执行成功的回调，更新config
      config = config.interceptors.requestSuccessFn(config)
    }
    //返回的Promise实例
    return new Promise<T>((resolve, reject) => {
      //any是参数类型，T是返回值类型

      this._instance
        .request<any, T>(config)
        .then((res) => {
          //如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
          if (config.interceptors?.responseSuccessFn) {
            //返回的是promise实例，如果就是返回的函数
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err: any) => {
          if (config.interceptors?.responseFailFn) {
            err = config.interceptors.responseFailFn
          }
          reject(err)
        })
    })
  }
  //get方法
  get<T = any>(config: YYRequestConfig<T>) {
    //...是对对象类型的数据进行解构
    return this.request({ ...config, method: 'get' })
  }
  //post方法
  post(config: any) {
    return this.request({ ...config, method: 'post' })
  }
  //delete方法
  delete<T = any>(config: YYRequestConfig<T>) {
    //...是对对象类型的数据进行解构
    return this.request({ ...config, method: 'delete' })
  }
  //patch方法
  patch(config: any) {
    return this.request({ ...config, method: 'patch' })
  }
}

export default YYRequest //导出一个请求实例
export { YYRequestConfig, YYInterceptors }
