import {$authHost, $host} from "./index";
//import jwt_decode from "jwt-decode";
import axios from "axios";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const editRating = async (id, rating) => {
    const {data} = await $authHost.put('api/device', {id, rating})
    // const {data} = await $authHost.put('api/device/15', {params: {"id" : rate.id, "rating" : rate.rating}})
    return data
  }

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}



//  export const fetchShapochka = async () => {
//      const {data} = await $host.get('api/shapochka')
//      return data
//  }

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    console.log(data)
    return data
}

export const fetchDevices = async (typeId, brandId, page, limit = 8, priceRange, sortBy) => {
    const {data} = await $host.get('api/device', {params: {
            typeId, brandId, page, limit, minPrice: priceRange.min, maxPrice: priceRange.max, sortBy
        }})
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}

export const deleteType = async (id) => {
    const {data} = await $authHost.delete('api/type/' + id);
    return data;
};

export const deleteBrand = async (id) => {
    const {data} = await $authHost.delete('api/brand/' + id);
    return data;
};

export const deleteDevice = async (id) => {
    const {data} = await $authHost.delete('api/device/' + id);
    return data;
};