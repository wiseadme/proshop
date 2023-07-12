import { Document, LeanDocument } from 'mongoose'
import { IMerchant, ISettings, ISite } from '@proshop/types'

export interface IMerchantService {
    create(merchant: IMerchant): Promise<Document & IMerchant>

    read(): Promise<LeanDocument<IMerchant>>

    update(updates: Partial<IMerchant>): Promise<{ updated: Document & IMerchant }>

    delete(id: string): Promise<boolean>
}

export interface ISettingsService {
    create(settings: Partial<ISettings>)

    read(): Promise<LeanDocument<ISettings>>

    update(updates: Partial<ISettings>): Promise<{ updated: Document & ISettings }>

    delete(id): Promise<boolean>
}
export interface ISiteService {
    create(siteConfig: Partial<ISite>)

    read(): Promise<LeanDocument<ISite>>

    update(updates: Partial<ISite>): Promise<{ updated: Document & ISite }>

    delete(id): Promise<boolean>
}
