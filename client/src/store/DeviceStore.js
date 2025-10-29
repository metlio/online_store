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
        this._searchTerm = ""
        this._sortBy = "price_asc"
        this._minPrice = 0
        this._maxPrice = 100000
        this._loading = false

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
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = brand
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

    setSearchTerm(term) {
        this._searchTerm = term
    }

    get searchTerm() {
        return this._searchTerm
    }

    setSortBy(sortBy) {
        this._sortBy = sortBy
    }

    get sortBy() {
        return this._sortBy
    }

    setMinPrice(price) {
        this._minPrice = price
    }

    get minPrice() {
        return this._minPrice
    }

    setMaxPrice(price) {
        this._maxPrice = price
    }

    get maxPrice() {
        return this._maxPrice
    }

    setLoading(loading) {
        this._loading = loading
    }

    get loading() {
        return this._loading
    }
}