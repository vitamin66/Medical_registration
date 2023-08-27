// 主页医院列表的 ts 数据类型 约束


// 其他数据类型的约束
export interface ResponseOtherData {
    "code": number,
    "message": string,
    "ok": boolean
}

// 医院数据类型的 约束
export interface HospitalData {
    "id": string,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
        "hostypeString": string,
        "fullAddress": string
    },
    "hoscode": string,
    "hosname": string,
    "hostype": string,
    "provinceCode": string,
    "cityCode": string,
    "districtCode": string,
    "address": string,
    "logoData": string,
    "intro": string,
    "route": string,
    "status": number,
    "bookingRule": {
        "cycle": number,
        "releaseTime": string,
        "stopTime": string,
        "quitDay": number,
        "quitTime": string,
        "rule": string[]
    }
}

// content 数组的类型就 =  上面定义好的  HospitalData 类型
export type Content = HospitalData[]

// 医院接口返回数据的类型 
export interface HospitalResData extends ResponseOtherData {
    "data": {
        "content": Content 
        "pageable": {
            "sort": {
                "sorted": boolean,
                "unsorted": boolean,
                "empty": boolean
            },
            "pageNumber": number,
            "pageSize": number,
            "offset": number,
            "paged": boolean,
            "unpaged": boolean
        },
        "totalPages": number,
        "totalElements": number,
        "last": boolean,
        "first": boolean,
        "sort": {
            "sorted": boolean,
            "unsorted": boolean,
            "empty": boolean
        },
        "numberOfElements": number,
        "size": number,
        "number": number,
        "empty": boolean
    },
}


