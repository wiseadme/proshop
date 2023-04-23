import { ICurrency } from './currency'

interface IMerchantLocations {
  coords: number[]
  address: string
}
interface IMerchant {
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

interface ISiteColors {
  base?: string
  content?: string
  primary?: string
  secondary?: string
  success?: string
  warning?: string
  error?: string
  disabled?: string
}

interface ISiteDesign {
  colors?: ISiteColors
  layout?: string
}

interface ISiteAboutPage {
  text: string
  image: string
  layout: string
}

interface ISitePages {
  about: ISiteAboutPage
}

interface ISiteConfig {
  design: ISiteDesign
  pages: ISitePages
}

export interface ISettings {
  merchant: IMerchant
  site: ISiteConfig
}
