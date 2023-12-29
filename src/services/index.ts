import { http } from "@/utils/http";
import type {indexContent} from "@/types/index"

// 获取首页内容（轮播图）
export const indexContentAPI = ()=>{
    return http<indexContent>({
        method: 'GET',
        url: '/home/content'
    })
}