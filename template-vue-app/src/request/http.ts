import axios from 'axios'
import type { AxiosResponse, AxiosRequestConfig } from 'axios'

import { logger } from '@/utils'
import HttpCache from '@/request/http-cache'
import type { HttpConfig } from '@/request/http-cache'

let sequence = 1
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
  return config
}, function (error) {
  logger(`---->> req error: ${error.stack}`)
  // Do something with request error
  return Promise.reject(error)
})

axiosInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  httpConfigSet.delete((response.config as HttpConfig)._sequence)
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.code === 'ERR_CANCELED') {
    logger(`<<---- req canceled: ${error.config._requestId}`)
  } else {
    logger(`<<---- res error: ${error.message}`)
  }
  httpConfigSet.delete(error.config._sequence)
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

  const requestId = `${method.toUpperCase()} ${url}`
  httpConfigSet.cancelWhenReqIsDuplicated(requestId)

  const controller = new AbortController()
  const finalConfig: HttpConfig = {
    ...defaultUserConfig,
    ...userConfig,
    signal: controller.signal,
    _sequence: sequence++,
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
  getRequestSize: () => httpConfigSet.size,
  cancelWhenRouteChanges: (reason?: string) => httpConfigSet.cancelWhenRouteChanges(reason),
}

export default http
