declare var stb: any;

export default class ParentControl {
  constructor() {
    ParentControl;
    if (ParentControl.cache) {
      return ParentControl.cache;
    }
    ParentControl.cache = this;
  }
  private static cache: any = false;
  public init() {
    this.getEnv();
    this.getPassword();
  }
  public getEnv() {
    try {
      this.mac = stb.RDir("MACAddress");
      this.parentControl = stb.RDir("getenv parentControlApps");
    } catch (e) {
      console.log(e);
    }
  }
  public getPassword() {
    var xhr = new XMLHttpRequest();
    xhr.open(
      "get",
      `http://212.77.128.205/stalker_portal/custom/get_pass.php?mac=${
        this.mac
      }`,
      true
    );
    xhr.send();
    xhr.onreadystatechange = _ => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          this.password = data.password;
          this.ready();
        }
      }
    };
  }
  public isParentControlOn() {
    if (typeof this.parentControl === "undefined") {
      return false;
    }
    if (this.parentControl) {
      return true;
    } else {
      return false;
    }
  }
  public openParentControlWindow() {
    this.parentControlWindow = new ParentControlWindow();
    this.parentControlWindow.OnSubmit = password => {
      if (this.checkPassword(password)) {
        this.parentControlWindow.close();
      } else {
        this.parentControlWindow.invalid();
      }
    };
  }
  private checkPassword(password) {
    return password === this.password;
  }
  private ready() {
    this.onReady();
  }
  public onReady;
  private parentControlWindow;
  private mac;
  private parentControl;
  private password;
}

class ParentControlWindow {
  constructor() {
    this.body = document.getElementsByTagName("body")[0];
    this.wrap = document.createElement("div");
    this.window = document.createElement("div");
    this.header = document.createElement("div");
    this.content = document.createElement("div");
    this.h1 = document.createElement("h1");
    this.input = document.createElement("input");
    this.invalidElem = document.createElement("p");
    this.input.type = "password";

    this.body.appendChild(this.wrap);
    this.wrap.appendChild(this.window);
    this.window.appendChild(this.header);
    this.window.appendChild(this.content);
    this.content.appendChild(this.h1);
    this.content.appendChild(this.input);
    this.content.appendChild(this.invalidElem);

    this.header.innerHTML = "РОДИТЕЛЬСКИЙ КОНТРОЛЬ";
    this.h1.innerHTML = "Для доступа к приложению необходимо ввести пароль:";

    this.addElemsClassName();
    this.input.focus();
    this.initInput();
  }
  public close() {
    document.onkeydown = this.oldInputHandler;
    this.wrap.style.display = "none";
    this.body.removeChild(this.wrap);
  }
  public invalid() {
    this.invalidElem.innerHTML = "Неправильный пароль!";
  }
  private addElemsClassName() {
    this.wrap.className = "ParentControlWindow_wrap";
    this.window.className = "ParentControlWindow_window";
    this.header.className = "ParentControlWindow_header";
    this.content.className = "ParentControlWindow_content";
    this.h1.className = "ParentControlWindow_h1";
    this.input.className = "ParentControlWindow_input";
    this.invalidElem.className = "ParentControlWindow_invalidElem";
  }
  private initInput() {
    this.oldInputHandler = document.onkeydown;
    document.onkeydown = event => {
      if (event.keyCode === 13) {
        this.submit(this.input.value);
      }
    };
  }
  private submit(value) {
    this.OnSubmit(value);
  }
  public OnSubmit;
  private wrap;
  private body;
  private window;
  private header;
  private content;
  private h1;
  private input;
  private oldInputHandler;
  private invalidElem;
}
