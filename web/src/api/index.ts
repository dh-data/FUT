import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'

// 默认配置
const commonDefaults: AxiosRequestConfig = {
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
}

Object.assign(axios.defaults, commonDefaults)

// 添加请求拦截器
axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (config.headers) {
      config.headers['Cache-Control'] = 'no-cache'
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

// 自定义错误响应接口
interface CustomError {
  code: number;
  data: any;
  msg: string;
}

// 添加响应拦截器
axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const resp = error.response || { status: 1000, data: { data: null, message: '', msg: '' }, headers: {} }
    const respData = resp.data as { data: any; message?: string; msg?: string }
    const errorData = error.response?.data as { message?: string } || {}
    const headers = resp.headers || {}
    let defaultMsg = `请求出错了！[${resp.status}]`
    
    console.log(resp)
    if ((resp as any).status < 500) {
      if ((resp as any).status === 401) {
        // navigate('/auth', { replace: true })
      }
    } else {
      // 服务端异常
      defaultMsg = `服务异常，请稍后再试！[${(resp as any).status || 1000}]`
    }

    const customError: CustomError = {
      code: resp.status,
      data: respData.data,
      msg: respData.message || respData.msg || errorData.message || defaultMsg
    }

    throw customError
  }
)

export default axios