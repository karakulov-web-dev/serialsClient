import BaseComponent from "./BaseComponent";

import HeaderComponent from "./HeaderComponent";
import SeasonListComponent from "./SeasonListComponent";
import BottomButtonComponent from "./BottomButtonComponent";

export default class HomeComponent extends BaseComponent {
  protected create() {
    let elem = document.createElement("div");
    elem.className = "app_HomeComponent";

    let compList = [SeasonListComponent];

    new HeaderComponent(this.model.serialList.display.get()()[this.model.serialList.focusPosition.get()].name).render(
      elem.appendChild(document.createElement("div"))
    );

    compList.forEach(Comp => {
      let wrap = document.createElement("div");
      let comp = new Comp();
      elem.appendChild(wrap);
      comp.render(wrap);
    });

    let bottomBtnComp = new BottomButtonComponent({
      red: {
        text: "Фильтр",
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
