import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL?.endsWith('/')
    ? process.env.REACT_APP_API_URL.slice(0, -1)
    : process.env.REACT_APP_API_URL;

const $host = axios.create({
    baseURL: baseURL
})

const $authHost = axios.create({
    baseURL: baseURL
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
