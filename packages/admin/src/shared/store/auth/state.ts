import { IUser } from '@proshop/types'

interface State {
    user: Maybe<IUser>
    isChecked: boolean
    isAuthenticated: boolean
}

export const state = (): State => ({
    user: null,
    isAuthenticated: false,
    isChecked: false,
})
