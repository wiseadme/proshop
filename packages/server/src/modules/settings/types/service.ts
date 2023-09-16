import { IMerchant, ISettings, ISite, Maybe } from '@proshop/types'

export interface IMerchantService {
    create(merchant: IMerchant): Promise<IMerchant>

    read(): Promise<Maybe<IMerchant>>

    update(updates: Partial<IMerchant>): Promise<{ updated: IMerchant }>

    delete(id: string): Promise<boolean>
}

export interface ISettingsService {
    create(settings: Partial<ISettings>)

    read(): Promise<Maybe<ISettings>>

    update(updates: Partial<ISettings>): Promise<{ updated: ISettings }>

    delete(id): Promise<boolean>
}
export interface ISiteService {
    create(siteConfig: Partial<ISite>)

    read(): Promise<Maybe<ISite>>

    update(updates: Partial<ISite>): Promise<{ updated: ISite }>

    delete(id): Promise<boolean>
}
