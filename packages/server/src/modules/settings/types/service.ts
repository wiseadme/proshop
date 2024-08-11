import { IMerchant, ISettings, ISite, Maybe } from '@proshop-app/types'
import { id } from 'inversify'

export interface IMerchantService {
    create(merchant: IMerchant): Promise<IMerchant>

    read(): Promise<Maybe<IMerchant>>

    update(updates: Partial<IMerchant>): Promise<IMerchant>

    delete(id: string): Promise<boolean>
}

export interface ISettingsService {
    create(settings: Partial<ISettings>)

    read(): Promise<Maybe<ISettings>>

    update(updates: Partial<ISettings>): Promise<ISettings>

    delete(id): Promise<boolean>
}
export interface ISiteService {
    create(siteConfig: Partial<ISite>)

    read(): Promise<Maybe<ISite>>

    update(updates: Partial<ISite>): Promise<ISite>

    delete(id): Promise<boolean>
}
