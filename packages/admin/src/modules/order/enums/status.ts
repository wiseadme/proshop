export enum OrderStatuses {
  created = 'Новый заказ',
  seen = 'Просмотрен',
  confirmed = 'Подтвержден',
  inProcess = 'В работе',
  ready = 'Готов',
  inDelivery = 'В доставке',
  completed = 'Выполнен',
  cancelled = 'Отменен'
}

export enum OrderProcessStatuses {
  inProcess = 'inProcess',
  ready = 'ready',
  inDelivery = 'inDelivery',
  completed = 'completed'
}
