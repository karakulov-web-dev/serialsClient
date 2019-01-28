import AppModel from "./AppModel";
import {get_Serials} from "./HTTP"
import createPrevViewData from "./createPrevViewData"
import { stbObj } from "./interfaceGlobal";

declare var stb:stbObj

let model:any = new AppModel()

export default class SearchManager {
    constructor () {

    }
    openWindow() {
        model.App.route.set(model.App.route.get() + "/searchManager")
        let input:any = document.querySelector(".app_home_searchManager_search_input");
        input.focus();
        try {
          stb.ShowVirtualKeyboard();
        } catch (e) {
          console.log(e);
        }
    }
    back() {
        model.App.route.set('/home')
    }
    submit() {
        let query = 'запрос'
        model.serialList.list.set(createPrevViewData())
        get_Serials({limit: 50, offset: 0}).then(data => {
         model.serialList.list.set(data)
        })
        model.App.route.set('/home')
    }
}