import BaseComponent from "./BaseComponent";
import HomeComponent from "./HomeComponent";
import SeasonsComponent from "./SeasonsComponent"
import SeriesComponent from "./SeriesComponent"
import PlayComponent from "./PlayComponent"
import ExitReqPageComp from "./ExitReqPageComp"
import UpdateLIstPageComponent from "./UpdateLIstPageComponent";

export default class PageRouter extends BaseComponent {
  constructor() {
    super();
    let model = this.model;
    let self = this;
    let App = model.getInstance("App");
    let route = App.getValue("route");
    route.subscribe(self);
  }
  protected create() {
    let elem = document.createElement("div");

    let App = this.model.getInstance("App");
    let route = App.getValue("route");
    route = route.get();

    route = route.split("/")
    route = "/" + route[1]

    let page;
    if (route === "/home") {
      page = new HomeComponent();
    } else if (route === '/seasonList' ) {
      page = new SeasonsComponent();
    } else if (route === '/seriesList') {
      page = new SeriesComponent()
    } else if (route === '/play') {
      page = new PlayComponent()
    } else if (route === '/exitReq') {
      page = new ExitReqPageComp()
    }  else if (route === '/UpdateLIstPage') {
      page = new UpdateLIstPageComponent()
    }
    
    page.render(elem);
    return elem;
  }
}
