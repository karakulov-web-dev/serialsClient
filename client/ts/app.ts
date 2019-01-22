import bindPolifil from "./Polyfill/bindSimplePolyfill";
import AppModel from "./AppModel";
import PageRouter from "./Components/PageRouter";
import inputLayer from "./inputLayer";
import {stbObj} from "./interfaceGlobal"
import adaptation from "./adaptation"
import {getSerials} from "./HTTP"
import aspectRatioManager from "./aspectRatioManager"

declare var gSTB:stbObj 
declare var stb:stbObj 
declare var netscape:any 
declare var window:any 

var prodaction = true
class App {
  static main(appContainerSelector: string) {
    bindPolifil();
    adaptation();
    try {
      netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");

      stb = gSTB
      stb.InitPlayer();
      stb.SetVideoControl(1);
      stb.SetVideoState(1);
      stb.SetTopWin(0);
      stb.SetVolume(50);
      var stbEvent = {
        onEvent: function(data) {},
        event: 0
      };
    } catch (e) {
      console.log(e);
    }

    aspectRatioManager.mount("aspect");
    aspectRatioManager.init()

    let appContainer = document.getElementById(appContainerSelector);
    let pageRouterWrap = document.createElement("div");
    appContainer.appendChild(pageRouterWrap);

    let model:any = new AppModel();
    window.model = model;
    getSerials({limit: 50, offset: 0}).then(data => {
      model.serialList.list.set(data)
    })

    inputLayer.init();

    let pageRouter = new PageRouter();
    pageRouter.render(appContainer);

  }
}

App.main("app");
