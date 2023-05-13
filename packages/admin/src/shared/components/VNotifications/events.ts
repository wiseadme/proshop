class EventEmitter {
  events: Record<string, Function[]>

  constructor(){
      this.events = {}
  }

  on(event, fn){
      if (!this.events[event]) {
          this.events[event] = []
      }

      this.events[event].push(fn)
  }

  off(event, fn){
      this.events[event].filter(cb => cb !== fn)
  }

  emit(event, ...args){
      this.events[event].forEach(fn => fn(...args))
  }
}

export const emitter = new EventEmitter()
