/* 
    配置路由
    1 从 vue-router 插件上引入 createRouter 方法
    2 通过 createRouter 方法创建 路由器实例并 默认导出
    3 指定路由模式  history 模式可以用 createWebHistory 方法
    4 配置具体的路由
*/
import { createRouter, createWebHistory } from 'vue-router'
// createRouter 可以创建路由器实例 用来管理多个路由 并默认导出
export default createRouter({
    // 设置路由模式 为 history
    history: createWebHistory(),
    // 配置具体的路由
    routes: [
        {
            path: '/home',
            component: () => import('../pages/home/index.vue'),
        },
        {
            path: '/hospital',
            component: () => import('../pages/hospital/index.vue'),
            children: [
                {
                    path: 'register',
                    component: () => import('../pages/hospital/register/index.vue')
                },
                {
                    path: 'step1',
                    component: () => import('../pages/hospital/register/register_step1.vue')
                },
                {
                    path: 'step2',
                    component: () => import('../pages/hospital/register/register_step2.vue')
                },
                {
                    path: 'details',
                    component: () => import('../pages/hospital/details/index.vue')
                },
                {
                    path: 'booking',
                    component: () => import('../pages/hospital/booking/index.vue')
                },
                {
                    path: 'discontinuation',
                    component: () => import('../pages/hospital/discontinuation/index.vue')
                },
                {
                    path: 'inquire',
                    component: () => import('../pages/hospital/inquire/index.vue')
                },
            ]
        },
        {
            path: '/user',
            component: () => import('../pages/user/index.vue'),
            children:[
                {
                    path:'certification',
                    component:()=> import('../pages/user/certification/index.vue')
                },
                {
                    path:'feedback',
                    component:()=> import('../pages/user/feedback/index.vue')
                },
                {
                    path:'information',
                    component:()=> import('../pages/user/information/index.vue')
                },
                {
                    path:'order',
                    component:()=> import('../pages/user/order/index.vue')
                },
                {
                    path:'patient',
                    component:()=> import('../pages/user/patient/index.vue')
                },
            ]
        },
        {
            path: '/wxlogin',
            component: () => import('../pages/wxlogin/index.vue'),
        },
        {
            // 默认访问主页
            path: '/',
            redirect: '/home'
        }
    ],
    // 设置滚动行为: 可以让路由切换时 控制滚动条的位置
    scrollBehavior() {
        return {
            left: 0,
            top: 0,
        }
    }
})