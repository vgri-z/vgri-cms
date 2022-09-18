import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DEFAULT_FORMAT_STRING = 'YYYY-MM-DD HH:mm:ss'

export default function formatUtlString(utcString: string, format: string = DEFAULT_FORMAT_STRING) {
  // utcOffset utc偏移量 https://dayjs.fenxianglu.cn/category/manipulate.html#utc%E5%81%8F%E7%A7%BB%E9%87%8F
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
