interface IUser {
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

interface State {
  user: Maybe<IUser>
}

export const state = (): State => ({
  user: null
})
