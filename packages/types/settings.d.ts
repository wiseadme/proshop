import { ICurrency } from './currency'

export interface IMerchantLocations {
  coords: number[]
  address: string
}
export interface IMerchant {
  name: string
  business: string
  description: string
  logo: string
  address: string
  email?: string
  phone: string
  currency: ICurrency
  locations: IMerchantLocations[]
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

export interface ISiteDesign {
  colors?: ISiteColors
  layout?: string
}

export interface ISiteAboutPage {
  text: string
  image: string
  layout: string
}

export interface ISitePages {
  about: ISiteAboutPage
}

export interface ISiteConfig {
  design: ISiteDesign
  pages: ISitePages
}

export interface ISettings {
  merchant: IMerchant
  site: ISiteConfig
}
