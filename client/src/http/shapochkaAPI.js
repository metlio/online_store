import {$authHost, $host} from "./index";

export const createType = async (type) => {
    const {data} = await $authHost.post('/api/shapochka', type)
    return data
}

export const fetchShapochka = async () => {
    const {data} = await $host.get('/api/shapochka')
    return data
}