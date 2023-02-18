import { defineStore } from 'pinia'
import accountLoginRequest from '@/service/login'
import getUserPmsById from '@/service/login'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'
const router = useRouter()
const loginStore = defineStore('login', {
  //state，get，actions
  state: () => ({
    token: '',
    name: '',
    getUserPms: {}
  }),
  actions: {
    async accountLoginAction(account: any) {
      const loginRes = await accountLoginRequest(account)
      //发送请求之后返回的data里面就有{id,name,token}然后把返回的内容保存到store里面
      //上面是发送请求进行登录的操作，如果是第一次登录只有name，没有token和id
      //如果是第二次登录，可以从本地存储取出token，id是什么
      console.log('这是请求返回的结果', loginRes.data)
      this.token = loginRes.data.token
      this.name = loginRes.data.name
      //进行本地缓存,只需要保存token
      // localStorage.setItem('id', this.id)
      // localStorage.setItem('token', this.token)
      // localStorage.setItem('name', this.name)
      localCache.setCache('token', loginRes.data.token)
      //根据id先拿到权限信息
      const getUserPmsRes = await getUserPmsById(loginRes.data.id)
      console.log(getUserPmsRes)
      this.getUserPms = getUserPmsRes.data
      //跳转到主页
      router.push('/main')
    }
  }
})
export default loginStore
