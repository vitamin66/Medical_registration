// 医院详情页的数据
import { defineStore } from 'pinia'

// 引入 axios 
import axios from '../../utils/request'
// 定义 store
const useHospitalDetail = defineStore('hosDetail', {
    state: (): any => {
        // 存储医院详情的数据
        return {
            hospitalInfo: {},
            hospitalDepartment: {}
        }
    },
    actions: {
        // 发请求拿到医院详情的数据
        getHospitalDetail(hoscode: string) {
            axios.get(`/api/hosp/hospital/${hoscode}`).then((res: any) => {
                if (res.code === 200) {
                    this.hospitalInfo = res.data
                }
            })
        },
        // 发请求拿到医院科室的数据
        getHospitalDepartment(hoscode: string) {
            axios.get(`/api/hosp/hospital/department/${hoscode}`).then((res: any) => {
                if (res.code === 200) {
                    this.hospitalDepartment = res.data
                }
            })
        }
    },
    getters: {

    },

})
// 对外暴露
export default useHospitalDetail

