export interface IAuthRepository {
  create(params): Promise<Record<'id', string>>

  read(token: string): any

  update(updates: any): Promise<{ updated: any }>

  delete(id: string): Promise<boolean>
}
