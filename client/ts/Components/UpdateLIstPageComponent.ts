import BaseComponent from "./BaseComponent";

import HeaderComponent from "./HeaderComponent";
import UpdateListComponent from "./UpdateListComponent";
import BottomButtonComponent from "./BottomButtonComponent";

export default class UpdateLIstPageComponent extends BaseComponent {
  protected create() {
    let elem = document.createElement("div");
    elem.className = "app_HomeComponent";

    let compList = [UpdateListComponent];
  
    new HeaderComponent('Обновления').render(
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
        text: "Все сериалы",
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
        visible: false
      }
    });
    let btnWrap = document.createElement("div");
    elem.appendChild(btnWrap);
    bottomBtnComp.render(btnWrap);
    return elem;
  }
}
