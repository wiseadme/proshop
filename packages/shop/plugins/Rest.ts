interface Api {
  post(url: string, ...params: any[]): Promise<any>
  get(url: string, ...params: any[]): Promise<any>
  patch(url: string, ...patch: any []): Promise<any>
  delete(url:string, ...params: any[]): Promise<any>
}

interface IRest {
  create(url: string, ...params: any[]): Promise<any>
  read(url: string, ...params: any[]): Promise<any>
  update(url: string, ...patch: any []): Promise<any>
  delete(url:string, ...params: any[]): Promise<any>
}

export class Rest implements IRest{
  private api: Api
  readonly baseUrl: string

  constructor(api, baseUrl) {
    this.api = api
    this.baseUrl = baseUrl
  }
  create(url = '', ...params) {
    return this.api.post(this.baseUrl + url, ...params)
  }
  read(url = '', ...params) {
    return this.api.get(this.baseUrl + url, ...params)
  }
  update(url = '', ...patch) {
    return this.api.patch(this.baseUrl + url, ...patch)
  }
  delete(url = '', ...params) {
    return this.api.delete(this.baseUrl + url, ...params)
  }
}
