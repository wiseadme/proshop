class Storage {
    set(key, val){
        return new Promise((resolve) => {
            localStorage.setItem(key, JSON.stringify(val))
            resolve(true)
        })
    }

    get(key){
        const item = localStorage.getItem(key)

        return new Promise((resolve, reject) => {
            if (item) {
                resolve(JSON.parse(item))
            } else {
                reject(false)
            }
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
