import axios from "axios";

const $host = axios.create({
    baseURL: (process.env.REACT_APP_API_URL || 'http://localhost:5000').replace(/\/$/, '')
})

const $authHost = axios.create({
    baseURL: (process.env.REACT_APP_API_URL || 'http://localhost:5000').replace(/\/$/, '')
})

const authInterceptor = config => {
    const token = localStorage.getItem('token');
    if (token && token !== 'null' && token !== 'undefined') {
        config.headers.authorization = `Bearer ${token}`
    }
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost,
}
