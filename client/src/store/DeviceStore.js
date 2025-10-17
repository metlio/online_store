import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    
    constructor() {

        this._types = []
        this._brands = []
        this._devices = []
        this._ratings = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._selectedBrandImg = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 5
        this._priceRange = {min: 0, max: 100000}
        this._sortBy = 'popularity'

        makeAutoObservable(this)

    }

    setTypes(types) {
        this._types = types
    }

    setRating(ratings){
        this._ratings = ratings
    }

    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }
    setSelectedType(type) {
        this.setPage(1)
        if (this._selectedType && this._selectedType.id === type.id) {
            this._selectedType = {}
        } else {
            this._selectedType = type
        }
    }
    setSelectedBrand(brand) {
        this.setPage(1)
        if (this._selectedBrand && this._selectedBrand.id === brand.id) {
            this._selectedBrand = {}
        } else {
            this._selectedBrand = brand
        }
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get ratings() {
        return this._ratings
    }
    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }

    get devices() {
        return this._devices
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }

    setPriceRange(priceRange) {
        this._priceRange = priceRange
    }

    get priceRange() {
        return this._priceRange
    }

    setSortBy(sortBy) {
        this._sortBy = sortBy
    }

    get sortBy() {
        return this._sortBy
    }
}