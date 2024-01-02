// 首页信息
export type IndexContent = {
    // 轮播图
    advertiseList : Advertise[];
}

// 轮播图参数
export type Advertise = {
    id: number;
    name: string;
    // 轮播位置：0->PC首页轮播；1->app首页轮播
    type: number;
    pic: string;
    startTime: Date;
    endTime: Date;
    // 上下线状态：0->下线；1->上线
    status: number;
    clickCount: number;
    orderCount: number;
    // 链接地址
    url: string;
    note: string;
    // 排序
    sort: number;

}