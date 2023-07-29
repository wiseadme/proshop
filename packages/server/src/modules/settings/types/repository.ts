import { Document, LeanDocument } from 'mongoose'
import { IMerchant, ISettings, ISite, Maybe } from '@proshop/types'

export interface IMerchantRepository {
    create(merchant: IMerchant): Promise<IMerchant>

    read(): Promise<Maybe<IMerchant>>

    update(updates: Partial<IMerchant>): Promise<{ updated: IMerchant }>

    delete(id: string): Promise<boolean>
}

export interface ISettingsRepository {
    create(settings: Partial<ISettings>): Promise<ISettings>

    read(): Promise<Maybe<ISettings>>

    update(updates: Partial<ISettings>): Promise<{ updated: ISettings }>

    delete(id): Promise<boolean>
}
export interface ISiteRepository {
    create(siteConfig: Partial<ISite>): Promise<ISite>

    read(): Promise<Maybe<ISite>>

    update(updates: Partial<ISite>): Promise<{ updated: ISite }>

    delete(id): Promise<boolean>
}
