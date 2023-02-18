interface ICompanyConfig {
  orgName: string
  name?: string
  logo: string
  address: string
  email?: string
  phone: string
}

interface ISiteDesignColors {
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
  colors: ISiteDesignColors
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

export interface IConfig {
  company: ICompanyConfig
  site?: ISiteConfig
}
