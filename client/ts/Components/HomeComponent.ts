import BaseComponent from "./BaseComponent";

import HeaderComponent from "./HeaderComponent";
import SerialListComponent from "./SerialListComponent";
import BottomButtonComponent from "./BottomButtonComponent";
import GenreSelectComponent from "./GenreSelectComponent"
import InfoComponent from "./InfoComponent"
import SearchComponent from "./SearchComponent"

export default class HomeComponent extends BaseComponent {
  protected create() {
    let elem = document.createElement("div");
    elem.className = "app_HomeComponent";

    let compList = [HeaderComponent, SerialListComponent, GenreSelectComponent, InfoComponent, SearchComponent];

    compList.forEach(Comp => {
      let wrap = document.createElement("div");
      let comp = new Comp();
      elem.appendChild(wrap);
      comp.render(wrap);
    });

    let bottomBtnComp = new BottomButtonComponent({
      red: {
        text: "Жанры",
        visible: true
      },
      green: {
        text: "Инфо",
        visible: true
      },
      yellow: {
        text: "Поиск",
        visible: true
      },
      blue: {
        text: "Сортировать",
        visible: true
      }
    });
    let btnWrap = document.createElement("div");
    elem.appendChild(btnWrap);
    bottomBtnComp.render(btnWrap);
    return elem;
  }
}
