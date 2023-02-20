//引入导出pinia
import { createPinia } from 'pinia'
//默认导出的变量可以改名字
import useLoginStore from './login/login';
import type { App } from 'vue';
const pinia = createPinia()
function registerStore(app: App<Element>) {
  app.use(pinia);
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}
export default registerStore
