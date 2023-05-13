interface IUser {
  exp: number
  expiresIn: number
  displayName: string
  email: string
  role: string[]
  mobile: string
  userId: string
}

interface State {
  user: Maybe<IUser>
  isChecked: boolean
  isAuthenticated: boolean
}

export const state = (): State => ({
    user: null,
    isAuthenticated: false,
    isChecked: false
})
