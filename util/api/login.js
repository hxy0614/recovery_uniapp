const http = uni.$u.http

// 微信一键登录
export const loginByWechat = (data)=>http.get('/api.weixin.qq.com/sns/jscode2session',{params:data})