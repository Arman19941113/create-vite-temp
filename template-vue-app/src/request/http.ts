import axios from 'axios'
import type { AxiosResponse, AxiosRequestConfig } from 'axios'

import { logger } from '@/utils'
import HttpCache from '@/request/http-cache'
import type { HttpConfig } from '@/request/http-cache'

const httpConfigSet = new HttpCache()

interface UserConfig extends AxiosRequestConfig {
  cancelDuplicated?: boolean
  cancelRoute?: boolean
}

const defaultUserConfig = {
  cancelDuplicated: true,
  cancelRoute: true,
} as const

const axiosInstance = axios.create({
  timeout: 10000,
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: false,
  xsrfCookieName: import.meta.env.VITE_CSRF_COOKIE_NAME,
  xsrfHeaderName: import.meta.env.VITE_CSRF_HEADER_NAME,
})

axiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  logger(`---->> req start: ${config.method} ${config.url} ${JSON.stringify(config.data) || ''}`)
  return config
}, function (error) {
  logger(`---->> req error: ${error}`)
  // Do something with request error
  return Promise.reject(error)
})

axiosInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  logger(`<<---- res ended: ${response.config.method} ${response.config.url} ${JSON.stringify(response.data) || ''}`)
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  logger(`<<---- res error: ${error.message}`)
  return Promise.reject(error)
})

type SimpleMethods = 'get' | 'head' | 'delete' | 'options'
type DataMethods = 'put' | 'post' | 'patch' | 'postForm'
function myRequest<T>(
  method: SimpleMethods | DataMethods,
  url: string,
  data: any,
  userConfig?: UserConfig,
): Promise<AxiosResponse<T>> {
  let axiosResponse

  const requestId = `${method}-${url}`
  httpConfigSet.cancelWhenReqIsDuplicated(requestId)

  const controller = new AbortController()
  const finalConfig: HttpConfig = {
    ...defaultUserConfig,
    ...userConfig,
    signal: controller.signal,
    _requestId: requestId,
    _controller: controller,
  }

  if (method === 'postForm') {
    const headers = finalConfig.headers || {}
    headers['Content-Type'] = 'application/x-www-form-urlencoded'
    finalConfig.headers = headers
  }

  const simpleMethods: Array<SimpleMethods> = ['get', 'head', 'delete', 'options']
  const dataMethods: Array<DataMethods> = ['put', 'post', 'patch', 'postForm']
  if (simpleMethods.includes(method as SimpleMethods)) {
    axiosResponse = axiosInstance[method]<T>(url, finalConfig)
  } else if (dataMethods.includes(method as DataMethods)) {
    axiosResponse = axiosInstance[method]<T>(url, data, finalConfig)
  } else {
    throw new Error(`Invalid method: ${method}`)
  }

  httpConfigSet.add(finalConfig)

  return axiosResponse
}

const http = {
  // T refers to the response data type
  get: <T>(url: string, userConfig?: UserConfig) => myRequest<T>('get', url, null, userConfig),
  head: <T>(url: string, userConfig?: UserConfig) => myRequest<T>('head', url, null, userConfig),
  delete: <T>(url: string, userConfig?: UserConfig) => myRequest<T>('delete', url, null, userConfig),
  options: <T>(url: string, userConfig?: UserConfig) => myRequest<T>('options', url, null, userConfig),
  put: <T>(url: string, data: any, userConfig?: UserConfig) => myRequest<T>('put', url, data, userConfig),
  post: <T>(url: string, data: any, userConfig?: UserConfig) => myRequest<T>('post', url, data, userConfig),
  patch: <T>(url: string, data: any, userConfig?: UserConfig) => myRequest<T>('patch', url, data, userConfig),
  postForm: <T>(url: string, data: any, userConfig?: UserConfig) => myRequest<T>('postForm', url, data, userConfig),
  cancelWhenRouteChanges: (reason?: string) => httpConfigSet.cancelWhenRouteChanges(reason),
}

export default http
