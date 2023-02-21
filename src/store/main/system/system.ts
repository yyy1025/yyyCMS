import { defineStore } from 'pinia';
import apis from '@/service/apis';
import { getUserList } from "@/service/main/system/system"
interface userStoreType {
  userList: any[],
  userTotalCount: number,
  // id: number
  // name: string
  // realname: string
  // cellphone: number
  // enable: number
  // departmentId: number
  // roleId: number
  // createAt: string
  // updateAt: string
}
const userStore = defineStore("user", {
  state: (): userStoreType => ({
    userList: [],
    userTotalCount: 0

  }),
  actions: {
    async userListAction(queryinfo: any) {
      const data = JSON.stringify({
        "offset": "0",
        "size": "10"
      })
      const data1 = JSON.stringify(queryinfo)
      const userListRes = await apis.post("/users/list", data1)
      const { totalCount, list } = userListRes.data
      console.log("totalcount", totalCount)
      console.log("list", list)

      // this.userList = list
      // this.userTotalCount = totalCount

    }

  }
})
export default userStore
