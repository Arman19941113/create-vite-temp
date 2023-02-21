import { FastAxios } from '@armantang/fast-axios'

const http = new FastAxios({
  timeout: 10000,
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: false,
  xsrfCookieName: import.meta.env.VITE_CSRF_COOKIE_NAME,
  xsrfHeaderName: import.meta.env.VITE_CSRF_HEADER_NAME,
}, {
  onReqFulfilled: function (config) {
    // Do something before request is sent
    return config
  },
  onReqRejected: function (error) {
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
      const message = `${resData.code} ${resData.message}`
      console.error(message)
      return Promise.reject(new Error(message))
    }
  },
  onResRejected: function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // For canceled request: error.code === 'ERR_CANCELED'
    if (error.code !== 'ERR_CANCELED') {
      console.error(error.message)
    }
    return Promise.reject(error)
  },
})

export { http }
