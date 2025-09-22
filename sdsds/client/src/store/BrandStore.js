import {makeAutoObservable} from "mobx";

export default class BrandStore {
    constructor() {
        this._types = []
        this._totalCount = 0
        makeAutoObservable(this)
    }

    setBrands(brands) {
        this._brands = brands
    }

    setTotalCount(count) {
        this._totalCount = count
    }

    get brands() {
        return this._brands
    }

    get totalCount() {
        return this._totalCount
    }
}
