import axios from 'axios'
// 全局配置

const fetchHeaderRef = {
  current: { 'Content-Type': 'application/json' }
}

export const setFetchHeader = (header: any) => {
  fetchHeaderRef.current = Object.assign(fetchHeaderRef.current, header)
}

export const getFetchHeader = () => fetchHeaderRef.current

const requestInterceptors = (config: any) => {
  // 在发送请求之前做些什么
  config.headers = getFetchHeader()
  return config
}

const responseInterceptors = (response: any) => {
  const { data } = response

  return data
}

const responseErrInterceptors = (err: any) => {
  // TODO: 报错处理
  const { status, data } = err.response

  if (status !== 200 || data.status === 'fail') {
    return Promise.reject(data)
  }
}

axios.interceptors.request.use(requestInterceptors, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(responseInterceptors, (error) => {
  return Promise.reject(error)
})

export const http = axios.create({
  baseURL: '/api'
})

http.interceptors.request.use(requestInterceptors)
http.interceptors.response.use(responseInterceptors, responseErrInterceptors)
