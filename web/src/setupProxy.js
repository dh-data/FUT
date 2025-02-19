// const { createProxyMiddleware } = require('http-proxy-middleware')

// module.exports = function (app) {
//   app.use(
//     '/api', // 代理路径（以 /api/v1 开头的请求会被代理）
//     createProxyMiddleware({
//       target: 'http://10.168.1.77:2000/', // 目标服务器地址
//       changeOrigin: true, // 修改请求头中的 Origin 为目标地址
//       rewrite: path => path.replace(/^\/api/, '') // 根据实际需要调整
//     })
//   )
// }
