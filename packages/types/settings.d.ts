import { ICurrency } from './currency'
import { Maybe } from './utils'

export interface IMerchantStores {
    coords: number[]
    address: string
}

export interface IMerchantSocial {
    vk?: string
    facebook?: string
    instagram?: string
}

export interface IMerchant {
    id: string
    organization: string
    name: Maybe<string>
    description: Maybe<string>
    logo: Maybe<string>
    slogan: Maybe<string>
    address: Maybe<string>
    email: Maybe<string>
    phone: Maybe<string>
    currency: ICurrency
    stores: Maybe<IMerchantStores[]>
    social: Maybe<IMerchantSocial>
}

export interface ISiteColors {
    base?: string
    content?: string
    primary?: string
    secondary?: string
    success?: string
    warning?: string
    error?: string
    disabled?: string
}

export interface ISite {
    id: string
    colors?: ISiteColors
    layout?: string
    components?: any
}

export interface ISiteAboutPage {
    text: string
    image: string
    layout: string
}

export interface ISitePages {
    about: ISiteAboutPage
}

export interface ISettings {
    id: string
    merchant?: string | IMerchant
    site?: string | ISite
}

export interface ISettingsMongoModel extends Omit<ISettings, 'id' | 'merchant' | 'site'>{
    _id: string
    merchant?: string | IMerchantMongoModel
    site?: string | ISiteMongoModel
}

export interface IMerchantMongoModel extends Omit<IMerchant, 'id'> {
    _id: string
}

export interface ISiteMongoModel extends Omit<ISite, 'id'> {
    _id: string
}
