import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', //authenticated || not-authenticated
        user: {},
        errorMessage: undefined,
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking'
            state.user = {}
            state.errorMessage = undefined
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated'
            state.user = payload
            state.errorMessage = undefined
        },
        onLogout: (state, { payload }) => {
            console.log(payload)
            state.status = 'not-authenticated'
            state.user = {}
            state.errorMessage = payload
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined
        },
        onRefreshToken: () => {
            console.log('refresh-token')
        },
    },
})

export const {
    onLogin,
    onRefreshToken,
    onChecking,
    onLogout,
    clearErrorMessage,
} = authSlice.actions
