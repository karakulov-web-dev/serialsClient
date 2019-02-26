import AppModel from "./AppModel";
import { stbObj, windowObj } from "./interfaceGlobal";
import RouteManager from "./RouteManager";

declare var stb: stbObj;
declare var window: windowObj;

let routeManager = new RouteManager();

export default class ExitManager {
  static cache: ExitManager;
  constructor() {
    if (typeof ExitManager.cache !== "undefined") {
      return ExitManager.cache;
    }
    this.model = new AppModel();
    this.App = this.model.getInstance("App");
    this.route = this.App.getValue("route");
    this.ExitMenuInstance = this.model.getInstance("ExitMenuInstance");
    this.exitReqConfig = this.ExitMenuInstance.getValue("config");
    ExitManager.cache = this;
  }
  public exitReq() {
    this.oldRoute = this.route.get();
    this.exitReqConfig.set({
      text: "Вы дейстивтельно хотите выйти?",
      list: [
        {
          name: "Да",
          command: "exit",
          active: true
        },
        {
          name: "Отмена",
          command: "cancel",
          active: false
        }
      ]
    });
    routeManager.set("/exitReq");
  }
  public exit() {
    stb.SetVideoState(1);

    var win: any = window;
    win.location = parseGetParams("referrer");
  }
  public cancel() {
    routeManager.back();
  }
  public downFocusPosition() {
    let config = this.exitReqConfig.get();
    let list = config.list;
    list[0].active = false;
    list[1].active = true;
    this.exitReqConfig.set(config);
  }
  public upFocusPosition() {
    let config = this.exitReqConfig.get();
    let list = config.list;
    list[0].active = true;
    list[1].active = false;
    this.exitReqConfig.set(config);
  }
  public submit() {
    let config = this.exitReqConfig.get();
    let list = config.list;
    let command;
    list.forEach(item => {
      if (item.active) {
        command = item.command;
      }
    });
    if (command === "exit") {
      this.exit();
    } else if (command === "cancel") {
      this.cancel();
    }
  }
  private oldRoute;
  private model: AppModel;
  private App;
  private route;
  private ExitMenuInstance;
  private exitReqConfig;
}

function parseGetParams(par) {
  var tmp = new Array(); // два вспомагательных
  var tmp2 = new Array(); // массива
  var param = new Array();
  var get = location.search; // строка GET запроса
  var result = ""; //переменная результата
  if (get != "") {
    tmp = get.substr(1).split("&"); // разделяем переменные
    for (var i = 0; i < tmp.length; i++) {
      tmp2 = tmp[i].split("="); // массив param будет содержать
      param[tmp2[0]] = tmp2[1]; // пары ключ(имя переменной)->значение
    }
  }
  if (typeof param[par] != "undefined") {
    result = param[par];
  }
  return result;
}
