import { defineStore } from 'pinia'
import accountLoginRequest from '@/service/login'
const loginStore = defineStore('login', {
  //state，get，actions
  state: () => ({
    id: '',
    token: '',
    name: ''
  }),
  actions: {
    async accountLoginAction(account: any) {
      const loginRes = await accountLoginRequest(account)
      //上面是发送请求进行登录的操作，如果是第一次登录只有name，没有token和id
      //如果是第二次登录，可以从本地存储取出token，id是什么
      console.log(loginRes)
      this.id = account.data.id
      this.token = account.data.token
      this.name = account.data.name
    }
  }
})
export default loginStore
