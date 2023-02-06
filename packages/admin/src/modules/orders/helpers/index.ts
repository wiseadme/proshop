import { Status } from '@shared/enums/order-statuses'
import { IOrderStatuses } from '@ecommerce-platform/types'

export const getOrderStatusName = (status: IOrderStatuses): string => {
  let statusName = ''

  if (status.created) {
    statusName = Status.CREATED
  }

  if (status.seen) {
    statusName = Status.SEEN
  }

  if (status.confirmed) {
    statusName = Status.CONFIRMED
  }

  if (status.inProcess) {
    statusName = Status.IN_PROCESS
  }

  if (status.ready) {
    statusName = Status.READY
  }

  if (status.completed) {
    statusName = Status.COMPLETED
  }

  if (status.cancelled) {
    statusName = Status.CANCELED
  }

  return statusName
}

export const addYmapsScript = () => {
  const url = new URL('https://api-maps.yandex.ru/2.1/')
  const searchParams = new URLSearchParams()

  searchParams.append('apikey', '')
  searchParams.append('lang', 'ru_RU')

  const scriptYandex = document.createElement('script')

  scriptYandex.setAttribute('src', url.toString() + '?' + searchParams.toString())
  scriptYandex.setAttribute('type', 'text/javascript')

  document.head.appendChild(scriptYandex)
}

