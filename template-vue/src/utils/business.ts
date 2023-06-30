import axios from 'axios'
import { HttpError } from '@/utils/http'

export function catchError(message: string, error: unknown, show = true): void {
  // report error
  if (error instanceof axios.AxiosError) {
    console.error(`${message} - [${error.code}] ${error.stack}`)
  } else if (error instanceof HttpError) {
    console.error(`${message} - [${error.code}] ${error.stack}`)
  } else if (error instanceof Error) {
    console.error(`${message} - ${error.stack}`)
  }

  if (show) {
    if (error instanceof axios.AxiosError) {
      // network error
      if (error.code === 'ERR_CANCELED') {
        // ignore cancel error
      } else {
        // show error
        console.log(message)
      }
    } else if (error instanceof HttpError) {
      // server error
      console.log(error.message)
    } else if (error instanceof Error) {
      // logic error
      console.log(message)
    }
  }
}
