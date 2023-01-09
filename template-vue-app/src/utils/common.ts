import * as console from 'console';

export function dateFormat(date: Date, fmt = 'YYYY-mm-dd HH:MM:SS sss'): string {
  const opt: Record<string, string> = {
    'Y+': date.getFullYear().toString(),
    'm+': (date.getMonth() + 1).toString(),
    'd+': date.getDate().toString(),
    'H+': date.getHours().toString(),
    'M+': date.getMinutes().toString(),
    'S+': date.getSeconds().toString(),
    's+': date.getMilliseconds().toString(),
  }
  for (const k in opt) {
    const ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'))
    }
  }
  return fmt
}

export function logger(msg: string) {
  if (import.meta.env.NODE_ENV !== 'production') {
    const date = dateFormat(new Date())
    console.log(`[${date}] ${msg}`)
  }
}

export function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

type NormalObj = { [key: string]: CloneValue }
type NormalArr = Array<CloneValue>
type CloneValue = NormalObj | NormalArr | string | number | boolean | null

export function deepClone<T extends CloneValue>(val: T): T {
  if (typeof val !== 'object' || val === null) return val;

  if (Array.isArray(val)) {
    return val.map(item => deepClone(item)) as T;
  }

  const obj: NormalObj = {};
  for (const key in val) {
    obj[key] = deepClone(val[key]);
  }
  return obj as T;
}