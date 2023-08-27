import { createApp } from 'vue'
// 引入根组件
import App from './App.vue'

// 引入全局的头部和底部，登录组件
import top from './components/top/index.vue'
import bottom from './components/bottom/index.vue'
import login from './components/login/index.vue'
// 引入路由鉴权配置文件
import './permission'

// 引入 vue-router插件
import router from './router/index'

// 引入 pinia 状态管理工具
import pinia from './store/index'

// 引入 element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入 element-plus 国际化语言包
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App)

// 注册全局组件
app.component('top', top)
app.component('bottom', bottom)
app.component('login', login)

// 安装 router
app.use(router)

// 安装 element-plus
app.use(ElementPlus, {
    locale: zhCn,
})

// 安装pinia
app.use(pinia)

// 挂载
app.mount('#app')