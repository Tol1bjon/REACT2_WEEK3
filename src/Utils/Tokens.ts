import axios from "axios";

export const saveToken = (token: string, refresh: string) => {
    localStorage.setItem('token', token)
    localStorage.setItem('refresh', refresh)
}

export const getToken = () => {
    return localStorage.getItem('token')
}

export const axiosRequest = axios.create({
    baseURL: import.meta.env.VITE_API
})

axiosRequest.interceptors.request.use(
    (config) => {
        const token = getToken()
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    }
)


export const removeToken = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh')
}


axiosRequest.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401 && !error.config.retry) {
            error.config.retry = true
            try {
                const { data } = await axios.post(`${import.meta.env.VITE_API}/api/auth/refresh`, {
                    refreshToken: localStorage.getItem('refresh')
                })
                saveToken(data.accessToken, data.refreshToken)
                error.config.headers['Authorization'] = `Bearer ${data.accessToken}`
                return axiosRequest(error.config)
            } catch (error) {
                removeToken()
                window.location.href = '/login'
            }
        }
        return Promise.reject(error)
    }
)