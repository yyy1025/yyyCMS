import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
//导入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css'
import '../src/assets/css/common.less'
import '../src/assets/css/reset.less'

//ts文件引入.vue文件没有报错,是因为typescript-vue-plugin（volar）这个插件被启用

import './assets/main.css'
import router from './router'
import pinia from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(ElementPlus)
app.use(pinia)
// app.use(store)
app.use(router)
app.mount('#app')


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
