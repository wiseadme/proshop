export interface IEventBusService {
  emit(event: string, data: any, sync?: boolean): Promise<void>

  on(event: string, callback: (data: any) => any): void
}

