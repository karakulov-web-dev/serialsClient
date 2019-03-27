import BaseComponent from "./BaseComponent";

import HeaderComponent from "./HeaderComponent";
import FavoritesListComponent from "./FavoritesListComponent";
import BottomButtonComponent from "./BottomButtonComponent";

export default class FavoritesPageComponent extends BaseComponent {
  protected create() {
    let elem = document.createElement("div");
    elem.className = "app_HomeComponent";

    let compList = [FavoritesListComponent];

    new HeaderComponent("Избранное").render(
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
        text: "Назад",
        visible: true
      },
      green: {
        text: "Удалить все",
        visible: false
      },
      yellow: {
        text: "Удалить",
        visible: true
      },
      blue: {
        text: "Удалить все",
        visible: true
      }
    });
    let btnWrap = document.createElement("div");
    elem.appendChild(btnWrap);
    bottomBtnComp.render(btnWrap);
    return elem;
  }
}
