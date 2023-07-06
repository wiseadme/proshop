import { Document, LeanDocument } from 'mongoose'
import { IMerchant, ISettings, ISite } from '@proshop/types'

export interface IMerchantRepository {
    create(merchant: IMerchant): Promise<Document & IMerchant>

    read(): Promise<LeanDocument<IMerchant>>

    update(updates: Partial<IMerchant>): Promise<{ updated: Document & IMerchant }>

    delete(id: string): Promise<boolean>
}

export interface ISettingsRepository {
    create(settings: Partial<ISettings>): Promise<Document & ISettings>

    read(): Promise<LeanDocument<ISettings>>

    update(updates: Partial<ISettings>): Promise<{ updated: Document & ISettings }>

    delete(id): Promise<boolean>
}
export interface ISiteRepository {
    create(siteConfig: Partial<ISite>): Promise<Document & ISite>

    read(): Promise<LeanDocument<ISite>>

    update(updates: Partial<ISite>): Promise<{ updated: Document & ISite }>

    delete(id): Promise<boolean>
}
