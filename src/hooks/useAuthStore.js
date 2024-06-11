import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import calendarApi from '../api/calendarApi'
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store'

export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const startLogin = async ({ email, password }) => {
        try {
            dispatch(onChecking())
            const { data } = await calendarApi.post('/auth/login', {
                email,
                password,
            })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid }))
        } catch (err) {
            const { data } = err.response
            dispatch(onLogout(data.msg))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10)
        }
    }

    const startRegister = async ({ email, name, password }) => {
        try {
            dispatch(onChecking())
            const { data } = await calendarApi.post('/auth/register', {
                name,
                email,
                password,
            })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid }))
        } catch (err) {
            const { data } = err.response
            dispatch(onLogout(data?.msg || 'error al registrarse'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10)
        }
    }

    const startLogout = async () => {
        localStorage.clear()
        dispatch(onLogout())
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token')
        if (!token) return dispatch(onLogout())
        try {
            const { data } = await calendarApi.get('/auth/refresh-token')
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid }))
        } catch (err) {
            localStorage.clear()
            dispatch(onLogout())
        }
    }

    return {
        status,
        user,
        errorMessage,

        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
    }
}
