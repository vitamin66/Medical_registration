/* 
    二次封装 axios 
    可以配置 请求拦截器, 响应拦截器
    请求拦截器一般可以携带公共的参数 例如: token
    响应拦截器一般可以简化服务器返回的数据 以及处理 http 网络错误
*/
// 引入 axios
import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '../store/modules/user'
// 调用axios 的create 方法实行二次封装
const request = axios.create({
    baseURL: '/api', // 设置基础路径
    timeout: 5000  // 设置请求超时时限
})
// 配置请求拦截器
request.interceptors.request.use((config) => {
    // 直接返回 config  配置对象即可 
    // config 身上有一个 headers 属性 可以通过它携带公共参数 例如 : token
    let useUserWorkStore = useUserStore()
    // 这里因为接口挂掉了所以拿不到对应的数据但是下面的配置token代码是没有问题的
    if(useUserWorkStore.phoneLoginInfo.token) {
        config.headers.token = useUserWorkStore.phoneLoginInfo.token
        // config.headers.Authorization = `Bearer ${useUserWorkStore.phoneLoginInfo.token}`;
    }

    return config
})


request.interceptors.response.use(
    (response) => {
        // 返回服务器响应的真正数据 data
        return response.data;
    },
    (error) => {
        // 处理 HTTP 网络错误并返回一个被拒绝的 Promise
        let status = error.response.status;
        switch (status) {
            case 404:
                ElMessage({
                    type: 'error',
                    message: '客户端错误404'
                });
                break;
            case 500:
            case 501:
            case 502:
            case 503:
            case 504:
            case 505:
                ElMessage({
                    type: 'error',
                    message: '服务器错误500'
                });
                break;
            default:
                ElMessage({
                    type: 'error',
                    message: '未知错误'
                });
        }

        return Promise.reject(new Error(error.message));
    }
);



// 默认暴露
export default request 
