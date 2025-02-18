import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// const navigate = useNavigate()
// 默认配置
const commonDefaults = {
  baseURL: 'http://10.168.1.77:2000/',
  crossDomain: true,
  withCredentials: true
}

Object.assign(axios.defaults, commonDefaults)
// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    config.headers['Cache-Control'] = 'no-cache'
    return config
  },
  error => Promise.reject(error)
)

// 添加响应拦截器
axios.interceptors.response.use(
  response => response,
  async error => {
    console.log(error, error.response, error.status)
    const resp = error.response || {}
    !resp.data && (resp.data = {})
    !error.data && (error.data = {})
    const headers = resp.headers || {}
    let defaultMsg = `请求出错了！[${resp.status || 1000}]`
    console.log(resp)
    if (resp.status < 500) {
      if (resp.status === 401) {
        // navigate('/auth', { replace: true })
      }
    } else {
      // 服务端异常
      defaultMsg = `服务异常，请稍后再试！[${resp.status || 1000}]`
    }

    throw {
      code: resp.status,
      data: resp.data.data,
      msg:
        resp.data.message || resp.data.msg || error.data.message || defaultMsg
    }
  }
)

export default axios
