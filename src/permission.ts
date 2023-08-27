/* 
    路由鉴权配置文件 
    当前医疗问诊项目 user路由组件需要登录才可以访问 其他不需要组件不需要鉴权
    配置好后需要在入口文件中引入 才会生效
*/
// 引入 路由器
import router from './router'
// import { useRoute, useRouter } from 'vue-router'

// 引入仓库拿到token 用token进行判断 有代表用户拥有所有访问权限 没有则只有部分访问权限
import useUserStore from './store/modules/user'

// 除了要引入自己的仓库还需要从 大仓库中引入 然后 执行13行代码
import pinia from './store/index'
let useStore = useUserStore(pinia)

// 用一个数组存储不需要权限就可以访问的路由组件
let notPermissionsArr = ['/home','/hospital/register','/hospital/details','/hospital/booking','/hospital/discontinuation','/hospital/inquire']
// 全局前置守卫
//@ts-ignore
router.beforeEach((to:any, form:any, next:any) => {
    // 判断用户是否有token 表示是否有登录
    if (useStore.phoneLoginInfo.token) {
        // 如果登录了则一路放行即可
        next()
    } else {
        // 如果没登录就要判断访问的路径是不是不需要权限的 如果是则放行 不是则跳回首页以及展示登录组件
        if(notPermissionsArr.includes(to.path)) {
            next()
        }else {
            // 显示登录框
            useStore.isShowLoginDialog = true
            // 跳转到主页 并且带上想去没去成的 路径 然后去登录组件的登录按钮那里加一个判断
            next({path:'/home',query:{redirect:to.fullPath}})
        }
    }
})
// 全局后置守卫
