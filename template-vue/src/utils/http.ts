import { AxiosError } from 'axios'
import { FastAxios } from '@armantang/fast-axios'

export class HttpError extends Error {
  constructor(message: string, public code: number) {
    super(message)
    this.name = 'HttpError'
  }
}

export const http = new FastAxios(
  {
    timeout: 10000,
    baseURL: '/',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: false,
    xsrfCookieName: import.meta.env.VITE_CSRF_COOKIE_NAME,
    xsrfHeaderName: import.meta.env.VITE_CSRF_HEADER_NAME,
  },
  {
    onReqFulfilled: function (config) {
      // Do something before request is sent
      return config
    },
    onReqRejected: function (error: AxiosError) {
      // Do something with request error
      return Promise.reject(error)
    },
    onResFulfilled: function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      const resData = response.data
      if (resData.code === 0) {
        return resData
      } else {
        return Promise.reject(new HttpError(resData.message, resData.code))
      }
    },
    onResRejected: function (error: AxiosError) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error)
    },
  },
)
