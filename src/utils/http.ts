const baseUrl = 'http://localhost:8085'

// 拦截request请求
uni.addInterceptor('request', {
  invoke(req: UniApp.RequestOptions) {
    if (!req.url.startsWith('http')) {
      // 请求不是以http开头的，说明是内部的请求，添加服务所在的基地址
      req.url = baseUrl + req.url
    }
    // 判断是否登录，如果已登录，请求头中携带token
  },
})

// 请求函数封装
type Data<T> = {
  code: number
  message: string
  data: T
}

export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 响应成功
      success: (res) => {
        resolve(res.data as Data<T>)
      },
      // 响应失败
      fail: (err) => {
        // 错误提示
        uni.showToast({
          icon: 'error',
          title: err.errMsg,
        })
        reject(err)
      },
    })
  })
}
