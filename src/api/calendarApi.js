import axios from 'axios'
import { getEnvVariables } from '../helper'

const { VITE_BACKEND_API_URL } = getEnvVariables()

const calendarApi = axios.create({
    baseURL: VITE_BACKEND_API_URL,
})

calendarApi.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        Authorization: localStorage.getItem('token'),
    }
    return config
})

export default calendarApi
