import {makeAutoObservable} from "mobx";

export default class ShapochkaStore {
    constructor() {
        this._devices= []
        makeAutoObservable(this)
    }

    setDevices(devices) {
        this._devices = devices
    }

    get devices() {
        return this._devices
    }
}