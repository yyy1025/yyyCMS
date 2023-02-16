import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import 'normalize.css'
import '../src/assets/css/common.less'
import '../src/assets/css/reset.less'

//ts文件引入.vue文件没有报错,是因为typescript-vue-plugin（volar）这个插件被启用

import './assets/main.css'
import router from './router'
import pinia from './store'
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
