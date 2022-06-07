export class Observer {
  subscribers: { [key: string]: Function }

  constructor(){
    this.subscribers = {}
  }

  add(event, fn){
    if (this.subscribers[event]) return

    this.subscribers[event] = fn
  }

  async emit(event, args: any = null){
    return await this.subscribers[event](args)
  }
}
