import { IMerchant, ISettings, ISite, Maybe } from '@proshop-app/types'

export interface IMerchantRepository {
    create(merchant: IMerchant): Promise<IMerchant>

    read(): Promise<Maybe<IMerchant>>

    update(updates: Partial<IMerchant>): Promise<IMerchant>

    delete(id: string): Promise<boolean>
}

export interface ISettingsRepository {
    create(settings: Partial<ISettings>): Promise<ISettings>

    read(): Promise<Maybe<ISettings>>

    update(updates: Partial<ISettings>): Promise<ISettings>

    delete(id): Promise<boolean>
}
export interface ISiteRepository {
    create(siteConfig: Partial<ISite>): Promise<ISite>

    read(): Promise<Maybe<ISite>>

    update(updates: Partial<ISite>): Promise<ISite>

    delete(id): Promise<boolean>
}
