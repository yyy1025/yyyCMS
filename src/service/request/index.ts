import axios from 'axios'
import AxiosHeaders from 'axios'
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders
} from 'axios'
//因为是一种类型，必须使用仅类型导入进行导入。
import type { YYRequestConfig } from './type'
class YYRequest {
  private _instance: AxiosInstance
  //每个人传过来的参数不一定一样，怎么办呢，那我们就直接传config对象
  constructor(config: YYRequestConfig<AxiosResponse>) {
    //设置当前的baseUrl
    //不存在属性instance
    this._instance = axios.create(config)
    //给每个instance实例都添加拦截器
    //添加全局请求拦截器
    this._instance.interceptors.request.use(
      (config) => {
        //对config添加loading、token、配置
        console.log('全局请求成功的拦截')
        return config
      },
      (err) => {
        console.log('全局请求失败的拦截')
      }
    )
    //添加全局响应拦截器
    this._instance.interceptors.response.use(
      (config) => {
        return config
      },
      (err) => {}
    )
    //针对xxx请求的请求拦截器
    if (config.interceptors) {
      this._instance.interceptors.request.use(
        config.interceptors.requestSuccessFn,
        config.interceptors.requestFailFn
      ),
        this._instance.interceptors.response.use(
          config.interceptors.responseSuccessFn,
          config.interceptors.responseFailFn
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
  request<T = any>(config: YYRequestConfig<T>) {
    if (config.interceptors?.requestSuccessFn) {
      //请求成功有值的话,调用拦截器执行成功的回调，更新config
      config = config.interceptors.requestSuccessFn(config)
    }
    // return this._instance.request(config)
    // return new Promise<AxiosResponse>((resolve, reject) => {
    //   this._instance.request(config).then(
    //     (res) => {
    //       resolve(res.data)
    //     },
    //     (err) => {
    //       reject(err)
    //     }
    //   )
    // })
    //返回的Promise实例
    return new Promise<T>((resolve, reject) => {
      //any是参数类型，T是返回值类型
      this._instance.request<any, T>(config).then(
        (res) => resolve(res),
        (err) => reject(err)
      )
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
