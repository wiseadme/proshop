class Storage {
  set(key, val){
    return new Promise((resolve) => {
      localStorage.setItem(key, val)
      resolve(true)
    })
  }

  get(key){
    return new Promise(resolve => {
      resolve(localStorage.getItem(key))
    })
  }

  remove(key){
    return new Promise(resolve => {
      localStorage.removeItem(key)
      resolve(true)
    })
  }
}

export const storage = new Storage()
