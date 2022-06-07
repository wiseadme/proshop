export interface IRest {
  get: (url: string, ...args: any) => Promise<{ data: any }>
  post: (url: string, ...args: any) => Promise<{ data: any }>
  patch: (url: string, ...args: any) => Promise<{ data: any }>
  delete: (url: string, ...args: any) => Promise<{ data: any }>
}

export interface IRepository {
  create: (...args: any[]) => Promise<{ data: any }>
  read: (...args: any[]) => Promise<{ data: any }>
  update: (...args: any[]) => Promise<{ data: any }>
  delete: (...args: any[]) => Promise<{ data: any }>
}
