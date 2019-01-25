import AppModel from "./AppModel";
let model:any = new AppModel()

export default class GenreManager {
    constructor () {

    }
    openWindow() {
        model.App.route.set(model.App.route.get() + "/infoManager")
    }
}