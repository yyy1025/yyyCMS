import apis from "@/service/apis"
//用户请求
// http://152.136.185.210:5000/users/list
// {
//   "offset":"0",
//   "size":"10"
// }
// 对用户增删改查
//getUserListData(queryInfo: any)
export function getUserList() {
  const data = JSON.stringify({
    "offset": "0",
    "size": "10"
  })
  return data;
}
// createUserData(userInfo: any)
// deleteUserData(id: number)
// editUserData(id: number, userInfo: any)
//对页面增伤改查
// getPageListData(pageName: string, queryInfo: any)
// deletePageData(pageName: string, id: number)
// newPageData(pageName: string, dataInfo: any)
// editPageData(pageName: string, id: number, dataInfo: any)
//查询部门、角色、菜单信息
// getDepartmentData(queryInfo: any)
// getRoleData(queryInfo: any)
// getMenuData()
