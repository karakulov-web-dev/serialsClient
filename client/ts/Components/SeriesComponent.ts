import BaseComponent from "./BaseComponent";

import HeaderComponent from "./HeaderComponent";
import SeriesListComponent from "./SeriesListComponent";
import BottomButtonComponent from "./BottomButtonComponent";

export default class HomeComponent extends BaseComponent {
  protected create() {
    let elem = document.createElement("div");
    elem.className = "app_HomeComponent";

    let compList = [SeriesListComponent];


    
    let title;
    let seasonListActiveName;
    let season_Number;
    let serialAtiveName;

    let seasonList = this.model.getInstance('seasonList').getValue('display').get()()
    let seasonFocusPosition = this.model.getInstance('seasonList').getValue('focusPosition').get()

    if (typeof seasonList[seasonFocusPosition] !== 'undefined') {
      seasonListActiveName = seasonList[seasonFocusPosition].name
      season_Number = seasonList[seasonFocusPosition].season_number
    } else {
      seasonListActiveName = false;
      season_Number = null;
    }

    let serialList = this.model.getInstance('serialList').getValue('display').get()()
    let serialFocusPosition = this.model.getInstance('serialList').getValue('focusPosition').get()
    serialAtiveName = serialList[serialFocusPosition].name;

    if (seasonListActiveName && seasonListActiveName === serialAtiveName) {
      title = seasonListActiveName + ' (' + season_Number + " сезон)";
    } else {
      title = serialAtiveName;
    }

    new HeaderComponent(title).render(
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
        text: "Инфо",
        visible: false
      },
      yellow: {
        text: "Поиск",
        visible: false
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
