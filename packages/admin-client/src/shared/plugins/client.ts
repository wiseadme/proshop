import { IRest } from '@shared/types/app'

export class Client {
  client: IRest

  constructor(client){
    this.client = client
  }

  get(url: string, params?: any){
    return this.client.get(url, params)
  }

  post(url: string, body: any){
    return this.client.post(url, body)
  }

  patch(url: string, params?: any){
    return this.client.patch(url, params)
  }

  delete(url: string, params?: any){
    return this.client.delete(url, params)
  }
}
