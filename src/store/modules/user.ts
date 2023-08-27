// 用于存储 用户相关的数据
import { defineStore } from "pinia";
// 引入二次封装的axios 
import axios from '../../utils/request'

const useUserStore = defineStore('user', {
    state: (): any => {
        return {
            isShowLoginDialog: false,
            code: '',
            phoneLoginInfo: JSON.parse(localStorage.getItem('userInfo') as string) || {},
        }
    },
    actions: {
        // 发送get短信验证码请求
        getVerifyCode(phonerNumber: string) {
            axios.get(`/api/sms/send/${phonerNumber}`).then((res: any) => {
                if (res.code === 200) {
                    this.code = res.data
                    console.log('短信验证码' + this.code)
                }
            })
        },
        // 发送post手机号登录请求
        getphoneLoginInfo(formData: any) {
            axios.post('/api/user/login', {
                code: formData.code,
                phone: formData.phoneNumber
            }).then((res: any) => {
                if (res.code === 200) {
                    this.phoneLoginInfo = res.data
                    localStorage.setItem('userInfo', JSON.stringify(this.phoneLoginInfo))
                    return 'ok'
                } else {
                    return Promise.reject(new Error(res.message))
                }
            })
        },
        // 退出登录并清空数据
        clearUserInfo() {
            //清空仓库的数据
            this.phoneLoginInfo = {}
            // 清空本地存储的数据 
            localStorage.removeItem('userInfo')
        },
        // 用户点击二维码登录后要一直判断用户是否扫码授权了 授权了就关闭登录框并保存用户信息然后跳转到主页
        savewxUserInfo() {
            let timer = setInterval(() => {
                if (localStorage.getItem('userInfo')) {
                    this.phoneLoginInfo = JSON.parse(localStorage.getItem('userInfo') as string)
                    this.isShowLoginDialog = false
                    clearInterval(timer)
                }
            }, 1000)
        }
    },
    getters: {

    },
})

export default useUserStore