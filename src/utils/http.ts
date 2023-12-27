
const baseUrl = 'http://localhost:8080'

// 拦截request请求
uni.addInterceptor('request',{
    invoke(req:UniApp.RequestOptions){
        if(!req.url.startsWith('http')){
            // 请求不是以http开头的，说明是内部的请求，添加服务所在的基地址
            req.url = baseUrl + req.url;
        }
        // 判断是否登录，如果已登录，请求头中携带token
    }
})