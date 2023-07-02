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
    _id: string
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
    _id: string
    merchant: IMerchant
    site: ISite
}
