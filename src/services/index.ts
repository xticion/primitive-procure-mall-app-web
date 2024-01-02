import { http } from "@/utils/http";
import type {IndexContent,Product} from "@/types/index"

// 获取首页内容（轮播图）
export const indexContentAPI = ()=>{
    return http<IndexContent>({
        method: 'GET',
        url: '/home/content'
    })
}

export const recommendProductList = (param:PageParam)=>{
    return http<Product>({
        method: 'GET',
        url: '/home/recommendProductList',
        data: param
    })
}

