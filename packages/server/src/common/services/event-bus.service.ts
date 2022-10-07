import { injectable } from 'inversify'
import { IEventBusService } from '@/types/services'

class Observer implements IEventBusService{
  subscribers: Record<string, ((...args: any) => any)[]>

  constructor(){
    this.subscribers = {}
  }

  on(event, callback){
    if (!this.subscribers[event]) {
      this.subscribers[event] = []
    }

    this.subscribers[event].push(callback)
  }

  async emit(event, args, sync = false){
    if (sync) {
      for (const fn of this.subscribers[event]) {
        await fn(args)
      }
    } else {
      this.subscribers[event].forEach(fn => fn(args))
    }
  }
}

const observer = new Observer()

@injectable()
export class EventBusService implements IEventBusService {
  on(event, callback){
    observer.on(event, callback)
  }

  async emit(event, args, sync = false){
    await observer.emit(event, args, sync)
  }
}
