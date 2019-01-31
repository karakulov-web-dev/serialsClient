import AppModel from "./AppModel";
let model:any = new AppModel()

export default class GenreManager {
    constructor () {

    }
    openWindow() {
        model.App.route.set(model.App.route.get() + "/infoManager")
    }
    back() {
        model.App.route.set('/serialList')
    }
    scrollBottom() {
       var scroll = document.querySelector('.app_home_infoManager_window_body_box2_description').scrollTop
       document.querySelector('.app_home_infoManager_window_body_box2_description').scrollTop = scroll + 10;
    }
    scrollTop() {
        var scroll = document.querySelector('.app_home_infoManager_window_body_box2_description').scrollTop
        document.querySelector('.app_home_infoManager_window_body_box2_description').scrollTop = scroll - 10;
     }
}