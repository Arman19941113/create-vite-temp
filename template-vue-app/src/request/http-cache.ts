import type { AxiosRequestConfig } from 'axios'

export interface HttpConfig extends AxiosRequestConfig {
  cancelDuplicated: boolean
  cancelRoute: boolean
  _sequence: number
  _requestId: string
  _controller: AbortController
}

export default class HttpCache {
  readonly #queue: Set<HttpConfig>

  constructor() {
    this.#queue = new Set()
  }

  get size() {
    return this.#queue.size
  }

  add(httpConfig: HttpConfig): Set<HttpConfig> {
    return this.#queue.add(httpConfig)
  }

  delete(sequence: number): boolean {
    for (const httpConfig of this.#queue) {
      if (httpConfig._sequence === sequence) {
        this.#queue.delete(httpConfig)
        return true
      }
    }

    return false
  }

  cancelWhenReqIsDuplicated(newRequestId: string, reason = 'cancel when req is duplicated'): void {
    const requests = []
    for (const httpConfig of this.#queue) {
      if (httpConfig.cancelDuplicated && httpConfig._requestId === newRequestId) {
        requests.push(httpConfig)
      }
    }
    for (const request of requests) {
      request._controller.abort(reason)
    }
  }

  cancelWhenRouteChanges(reason = 'cancel when route changes'): void {
    const requests = []
    for (const httpConfig of this.#queue) {
      if (httpConfig.cancelRoute) {
        requests.push(httpConfig)
      }
    }
    for (const request of requests) {
      request._controller.abort(reason)
    }
  }
}
