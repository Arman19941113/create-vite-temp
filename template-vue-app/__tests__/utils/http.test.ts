import { beforeAll, afterAll, describe, it, expect } from 'vitest'

import { http, sleep } from '@/utils'
import { httpServer } from '../test-helper'

const port = 9001
beforeAll(async () => {
  await httpServer.listen(port)
})
afterAll(httpServer.close)

const userConfig = {
  baseURL: 'http://127.0.0.1:' + port,
}

describe('http', () => {
  it('should work', async () => {
    const res = await http.get('/api/hello-world', userConfig)
    expect(res.status).toEqual(200)
    expect(res.statusText).toEqual('OK')
    expect(res.data).toEqual('hello world')
  })

  it('should cancel duplicated request', async () => {
    http.post('/api/sleep', 100, userConfig).catch(err => {
      expect(err.message).toEqual('canceled')
      expect(err.code).toEqual('ERR_CANCELED')
    })
    expect(http.getRequestSize()).toEqual(1)

    await sleep(50)
    http.post('/api/sleep', 100, userConfig).then(res2 => {
      expect(res2.status).toEqual(200)
      expect(res2.statusText).toEqual('OK')
      expect(res2.data).toEqual('hello world')
    })
    expect(http.getRequestSize()).toEqual(2)

    await sleep(150)
    expect(http.getRequestSize()).toEqual(0)
    const res3 = await http.post('/api/sleep', 10, userConfig)
    expect(res3.status).toEqual(200)
    expect(res3.statusText).toEqual('OK')
    expect(res3.data).toEqual('hello world')
  })

  it('shouldn\'t cancel duplicated request', async () => {
    http.post('/api/sleep', 100, {
      ...userConfig,
      cancelDuplicated: false,
    }).then(res1 => {
      expect(res1.status).toEqual(200)
      expect(res1.statusText).toEqual('OK')
      expect(res1.data).toEqual('hello world')
    })
    await sleep(50)
    const res2 = await http.post('/api/sleep', 100, userConfig)
    expect(res2.status).toEqual(200)
    expect(res2.statusText).toEqual('OK')
    expect(res2.data).toEqual('hello world')
  })

  it('should cancel request when cancelWhenRouteChanges is called', async () => {
    http.post('/api/sleep', 100, userConfig).catch(err => {
      expect(err.message).toEqual('canceled')
      expect(err.code).toEqual('ERR_CANCELED')
    })
    await sleep(50)
    http.cancelWhenRouteChanges()
  })

  it('shouldn\'t cancel request when cancelWhenRouteChanges is called', async () => {
    http.post('/api/sleep', 100, {
      ...userConfig,
      cancelRoute: false,
    }).then(res => {
      expect(res.status).toEqual(200)
      expect(res.statusText).toEqual('OK')
      expect(res.data).toEqual('hello world')
    })
    await sleep(50)
    http.cancelWhenRouteChanges()
  })
})
