import axios from 'axios'
import { HttpError } from '@/utils/http'

export function catchError (message: string, error: unknown, show = true): void {
  // report error
  if (error instanceof axios.AxiosError) {
    console.error(`[${error.code}] ${error.stack}`)
  } else if (error instanceof HttpError) {
    console.error(`[${error.code}] ${error.stack}`)
  } else if (error instanceof Error) {
    console.error(`${error.name}: ${error.stack}`)
  }

  if (show) {
    if (error instanceof axios.AxiosError) {
      // network error
      if (error.code === 'ERR_CANCELED') {
        // ignore error
      } else {
        // show error
      }
    } else if (error instanceof HttpError) {
      // server error
      // show error
    } else if (error instanceof Error) {
      // show error
    }
  }
}
