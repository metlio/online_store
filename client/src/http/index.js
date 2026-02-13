import axios from "axios";

const sanitizeUrl = (url) => {
    if (!url) return url;
    return url.endsWith('/') ? url : url + '/';
}

const $host = axios.create({
    baseURL: sanitizeUrl(process.env.REACT_APP_API_URL)
})

const $authHost = axios.create({
    baseURL: sanitizeUrl(process.env.REACT_APP_API_URL)
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
