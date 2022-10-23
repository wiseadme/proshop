interface State {
  access_token: string
  refresh_token: string
  exp: number
  expires_in: number
  given_name: string
  family_name: string
  email: string
  role: string[]
  mobile: string
}

export const state = (): State => ({
  access_token: '',
  refresh_token: '',
  exp: 0,
  expires_in: 0,
  given_name: '',
  family_name: '',
  email: '',
  role: [],
  mobile: ''
})
