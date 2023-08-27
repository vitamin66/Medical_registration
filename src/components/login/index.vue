<template>
    <div class="login">
        <el-dialog v-model="userLoginStore.isShowLoginDialog" title="登录" @close="close">
            <div class="content">
                <!-- 左边手机号登录表单区域 -->
                <div class="leftForm" v-if="isShow == 0">
                    <el-form :model="formData" :rules="rules" ref="form">
                        <el-form-item prop="phoneNumber">
                            <el-input placeholder="请输入手机号" :prefix-icon="Iphone" v-model="formData.phoneNumber"></el-input>
                        </el-form-item>
                        <el-form-item prop="code">
                            <el-input placeholder="请输入验证码" :prefix-icon="Lock" v-model="formData.code"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="btncode" :disabled="!isPhone || falg ? true : false" @click="getCode">
                                <countDown v-if="falg" :falg="falg" @getFalg="getFalg" />
                                <span v-else>获取验证码</span>
                            </el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" :disabled="!isPhone || formData.code.length < 6 ? true : false"
                                @click="userlogin">点击登录</el-button>
                        </el-form-item>
                        <!-- 微信登陆图标 -->
                        <div class="weixingfather" @click="changeLoginShow">
                            <h2>微信扫码登录</h2>
                            <svg t="1692362502877" class="icon weixing" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="5096" width="32" height="32">
                                <path
                                    d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                    fill="#28C445" p-id="5097"></path>
                                <path
                                    d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                    fill="#28C445" p-id="5098"></path>
                            </svg>
                        </div>
                    </el-form>
                </div>
                <!-- 左边的微信登录区域 -->
                <div class="wechatLogin" v-if="isShow == 1">
                    <!-- 放置登录二维码的地方会解析成iframe -->
                    <div id="login_container"></div>
                    <!-- 返回手机登录页面 -->
                    <div class="phone" @click="changPhone">
                        <svg t="1692501727573" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="7969" width="32" height="32">
                            <path d="M512.1 512.4m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#BF67E8"
                                p-id="7970"></path>
                            <path
                                d="M619.9 796.8H404.2c-23.8 0-43.3-19.5-43.3-43.3V271.2c0-23.8 19.5-43.3 43.3-43.3h215.7c23.8 0 43.3 19.5 43.3 43.3v482.3c0 23.9-19.5 43.3-43.3 43.3z"
                                fill="#FFFFFF" p-id="7971"></path>
                            <path
                                d="M623.2 734H401c-7.7 0-13.9-6.2-13.9-13.9V304.7c0-7.7 6.2-13.9 13.9-13.9h222.2c7.7 0 13.9 6.2 13.9 13.9v415.4c0 7.7-6.2 13.9-13.9 13.9z"
                                fill="#BF67E8" p-id="7972"></path>
                            <path d="M512.1 765.8m-15.8 0a15.8 15.8 0 1 0 31.6 0 15.8 15.8 0 1 0-31.6 0Z" fill="#BF67E8"
                                p-id="7973"></path>
                            <path
                                d="M550.2 474.4c1-0.5 1.4-1.7 0.9-2.7-1.4-3.3-5.7-9.5-17.3-9.5-15.8 0-21.6 5.7-21.6 5.7s-4.1-5.7-21.6-5.7-25.1 23.5-21.3 42.3c4.1 20.2 17.5 39.6 25.9 39.6s10.9-4.6 18-4.6 12.3 4.6 18.3 4.6 13.1-5.2 18-13.4c3.4-5.7 5.3-11.5 6.1-14.6 0.3-1.1-0.3-2.2-1.4-2.6-4.1-1.3-13.1-5.6-13.1-19.2 0.1-13.1 6.2-18.2 9.1-19.9zM532.4 435.2c1.6-0.3 3.1 1 3 2.6-0.3 3.8-1.4 10.3-5.6 15.1-4.2 4.8-10.5 6.8-14.2 7.6-1.6 0.3-3.1-1-3-2.6 0.3-3.8 1.4-10.3 5.6-15.1 4.2-4.9 10.5-6.8 14.2-7.6z"
                                fill="#BF67E8" p-id="7974"></path>
                            <path
                                d="M522.8 263.5H473c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5h49.8c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5z"
                                fill="#BF67E8" p-id="7975"></path>
                            <path d="M548.1 259.5m-5 0a5 5 0 1 0 10 0 5 5 0 1 0-10 0Z" fill="#BF67E8" p-id="7976"></path>
                        </svg>
                    </div>
                </div>
                <!-- 右边二维码区域 -->
                <div class="qrCode">
                    <!-- 上面二维码图片区域 -->
                    <div class="top">
                        <div class="item">
                            <img src="../../assets/images/code_app.png" alt="">
                            <div>
                                <svg t="1692364250672" class="icon " viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="5584" width="16" height="16">
                                    <path
                                        d="M664.250054 368.541681c10.015098 0 19.892049 0.732687 29.67281 1.795902-26.647917-122.810047-159.358451-214.077703-310.826188-214.077703-169.353083 0-308.085774 114.232694-308.085774 259.274068 0 83.708494 46.165436 152.460344 123.281791 205.78483l-30.80868 91.730191 107.688651-53.455469c38.558178 7.53665 69.459978 15.308661 107.924012 15.308661 9.66308 0 19.230993-0.470721 28.752858-1.225921-6.025227-20.36584-9.521864-41.723264-9.521864-63.862493C402.328693 476.632491 517.908058 368.541681 664.250054 368.541681zM498.62897 285.87389c23.200398 0 38.557154 15.120372 38.557154 38.061874 0 22.846334-15.356756 38.156018-38.557154 38.156018-23.107277 0-46.260603-15.309684-46.260603-38.156018C452.368366 300.994262 475.522716 285.87389 498.62897 285.87389zM283.016307 362.090758c-23.107277 0-46.402843-15.309684-46.402843-38.156018 0-22.941502 23.295566-38.061874 46.402843-38.061874 23.081695 0 38.46301 15.120372 38.46301 38.061874C321.479317 346.782098 306.098002 362.090758 283.016307 362.090758zM945.448458 606.151333c0-121.888048-123.258255-221.236753-261.683954-221.236753-146.57838 0-262.015505 99.348706-262.015505 221.236753 0 122.06508 115.437126 221.200938 262.015505 221.200938 30.66644 0 61.617359-7.609305 92.423993-15.262612l84.513836 45.786813-23.178909-76.17082C899.379213 735.776599 945.448458 674.90216 945.448458 606.151333zM598.803483 567.994292c-15.332197 0-30.807656-15.096836-30.807656-30.501688 0-15.190981 15.47546-30.477129 30.807656-30.477129 23.295566 0 38.558178 15.286148 38.558178 30.477129C637.361661 552.897456 622.099049 567.994292 598.803483 567.994292zM768.25071 567.994292c-15.213493 0-30.594809-15.096836-30.594809-30.501688 0-15.190981 15.381315-30.477129 30.594809-30.477129 23.107277 0 38.558178 15.286148 38.558178 30.477129C806.808888 552.897456 791.357987 567.994292 768.25071 567.994292z"
                                        fill="#5D5D5D" p-id="5585"></path>
                                </svg>
                            </div>
                            <p>微信扫一扫关注</p>
                            <p>“快速预约挂号”</p>
                        </div>
                        <div class="item">
                            <img src="../../assets/images/code_app.png" alt="">
                            <div>
                                <svg t="1692365001447" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="6728" width="16" height="16">
                                    <path
                                        d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z"
                                        p-id="6729"></path>
                                </svg>
                            </div>
                            <p>扫一扫下载</p>
                            <p>“预约挂号”APP</p>
                        </div>
                    </div>
                    <!-- 下面文字提示区域 -->
                    <div class="tip">
                        <p>官方指定平台</p>
                        <p>快速挂号 安全放心</p>
                    </div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeDailog">取消登录</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import axios from '../../utils/request'
import { ElMessage } from 'element-plus'
import { ref, reactive, computed, watch } from 'vue'
import countDown from '../login/countDown/index.vue'
// 引入字体图标
//#region 
import {
    Lock,
    Iphone
} from '@element-plus/icons-vue'
//#endregion
// 引入仓库 取出数据用于控制login 组件下的登录控件的显示隐藏
import useUserStore from '../../store/modules/user.ts'
let userLoginStore = useUserStore()

// 控制手机号登录或者微信登录显示/隐藏的数据
let isShow = ref<any>(0)

// 点击手机号登录或者微信登录的回调
const changeLoginShow = async () => {
    // 切换显示模式
    isShow.value = 1;

    let stateURL = encodeURIComponent(window.location.origin)
    // 发请求拿参数
    const res = await axios.get(`/api/user/weixin/getLoginParam?wxRedirectUri=${stateURL}/wxlogin`)


    //@ts-ignore
    new WxLogin({
        self_redirect: true, // 手机点击确认登录后可以在 iframe 内跳转到 redirect_uri
        id: "login_container", // 显示二维码的容器id
        appid: res.data.appid, // 应用唯一标识
        scope: "snsapi_login", // 应用授权作用域 网页应用目前仅填写snsapi_login即可
        redirect_uri: res.data.redirectUri, // 微信服务器重定向到企业服务器的地址，需要进行UrlEncode编码
        state: res.data.state,  // 可以让企业服务器重新向前端的具体页面
        style: "black",  // 描述文字的样式
        href: ""   // 自定义样式链接
    });

}

// 监听 isShow 如果用户切换成了微信扫码登录说明 isShow值变为了1 就需要判断本地存储有没有用户信息 如果有就说明用户扫码成功了 就需要关闭登录框并显示用户信息
watch(() => isShow.value, (val: number) => {
    if (val === 1) {
        userLoginStore.savewxUserInfo()
    }
})

// 点击手机图标切回手机登录
const changPhone = () => {
    isShow.value = 0
}


// 收集表单数据
let formData = reactive({
    phoneNumber: '',
    code: '',
})

// 计算一下手机号码是否匹配正则表达式 匹配就显示发送验证码按钮 反之则隐藏
let isPhone = computed((): any => {
    const regex = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
    return regex.test(formData.phoneNumber)
})

// 控制倒计时验证码的数据  false为显示正常发送验证码  true 为显示倒计时验证码
let falg = ref<boolean>(false)

// 发请求拿验证码
function getCode() {
    falg.value = true
    userLoginStore.getVerifyCode(formData.phoneNumber)
}

// 自定义事件用来接收子组件传过来的false值用来更改 falg 从而让倒计时组件隐藏 
function getFalg(val: boolean) {
    falg.value = val
}

// 最终表单校验只有所有的表单项都通过了校验才可以发请求登录 
let form = ref<any>()

// 点击取消登录也可以关闭登录框 用的另外一种方法 控制 Login 组件的销毁从而实现表单的清空和校验的重置 userLoginStore.isShowLoginDialog属性来控制即可
let closeDailog = () => {
    // 隐藏登录框
    userLoginStore.isShowLoginDialog = false
    // // 清空input框
    // Object.assign(formData, { phoneNumber: '', code: '' })
    // // 重置表单校验
    // form.value.resetFields()
}

// // 关闭登录框时清空表单
let close = () => {
    // 清空input框
    Object.assign(formData, { phoneNumber: '', code: '' })
    // 重置表单校验
    if (isShow.value === 0) {
        form.value.resetFields()
    }
}
// 创建路由器
let $router = useRouter()

// 点击登录按钮的回调
const userlogin = async () => {
    // 表单的最终验证 验证完了没问题再发请求登录
    await form.value.validate()
    try {
        await userLoginStore.getphoneLoginInfo(formData)
        userLoginStore.isShowLoginDialog = false
        // 如果路径中有query参数表示 是用户没登录然后点击有权限的路由跳转回主页的 这个时候如果用户登录完成了 则需要回到当时没有权限而没有展示的路由 而不是继续停留在主页
        // let redirect = $route.query.redirect
        // if (redirect) {
        //     $router.push(redirect as string)
        // } else {
        //     $router.push('/home')
        // }
    } catch (error) {
        ElMessage({
            type: 'error',
            message: (error as Error).message
        })
    }
    // 登录完成后跳转到首页路由组件
    $router.push({ path: '/home' })
}

// 自定义表单校验规则
// 手机的校验规则
//@ts-ignore
function validatorPhone(rule: any, value: any, callback: any) {
    // rule 表单校验对象
    // value 表单项里的值
    // callback 表单校验trigger触发就会 调这个函数
    let reg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
    if (reg.test(value)) {
        callback()
    } else {
        callback(new Error('请输入正确的手机号'))
    }
}
//@ts-ignore
// 验证码的校验规则
function validatorCode(rule: any, value: any, callback: any) {
    if (value.length === 6) {
        callback()
    } else {
        callback(new Error('请输入6位的验证码'))
    }
}
let rules = {
    // 手机号的自定义校验规则   
    phoneNumber: [{ trigger: 'change', validator: validatorPhone }],
    // 手机号的自定义校验规则   
    code: [{ trigger: 'change', validator: validatorCode }]
}
</script>

<!-- 组件命名 -->
<script lang="ts">
export default {
    name: 'Login'
}


</script>

<style scoped lang="scss">
.weixingfather {
    position: relative;
    height: 30px;

    .weixing {
        position: absolute;
        left: 74px;
        top: -8px;
    }
}

.login {
    ::v-deep(.el-dialog) {
        --el-dialog-width: 44%;
    }

    ::v-deep(.el-dialog__body) {
        border-top: 1px solid #7f7f7f;
        border-bottom: 1px solid #7f7f7f;
    }

    .content {
        display: flex;

        .leftForm {
            flex: 40%;
            border: 1px solid #7f7f7f;
            border-radius: 10px;
            padding: 30px;

            h2 {
                text-align: center;
                margin: 10px 0;
                font-size: 15px;
            }

            ::-vdeep(.el-button.is-circle) {
                padding: 0;
                margin-left: 50px;
            }

            ::v-deep(.el-button+.el-button) {
                margin-left: 0;
                width: 100%;
                margin-top: 20px;
            }

            ::v-deep(.el-button--primary) {
                width: 100%;
            }
        }

        .wechatLogin {
            .phone {
                text-align: center;
            }
        }

        .qrCode {
            flex: 40%;
            padding-top: 10%;

            .top {
                display: flex;
                justify-content: space-around;
                text-align: center;

                .item {
                    display: flex;
                    flex-direction: column;
                    align-content: center;

                    img {
                        width: 130px;
                        height: 130px;
                    }
                }
            }

            .tip {
                text-align: center;
                margin-top: 30px;
                font-style: italic;

                p {
                    margin: 10px 0;
                    font-size: 20px;
                    font-weight: 900;
                }
            }
        }
    }
}
</style>
