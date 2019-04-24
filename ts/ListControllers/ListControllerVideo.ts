import ListController from "./ListController";
import Play from "../Play";
import { stbObj, stbEvent } from "../interfaceGlobal";
import RouteManager from "../RouteManager";
import {
  pushHistory,
  ErrorSeasonNotFound,
  getSerialBySeasonvarId,
  pushFavorites
} from "../HTTP";
import { Promise_simple } from "../Polyfill/Promise_simple";

declare var stb: stbObj;
declare var stbEvent: stbEvent;

export default class ListControllerVideo extends ListController {
  public onEnter() {
    this.defineActiveItem();
    this.openVideo();
  }
  public goHome() {
    new RouteManager().set("/serialList");
  }
  protected infiniteScroll() {
    return false;
  }
  private defineActiveItem() {
    let focusPosition = this.focusPosition.get();
    let display = this.display.get()();
    this.activeItem = display[focusPosition];
  }
  public addFav() {
    let model = this.model;
    let messageText = model.message.text;
    let messageVisible = model.message.visible;
    this.defineActiveItem();
    getSerialBySeasonvarId(+this.activeItem.seasonId).then(data => {
      pushFavorites(data.id);
    });
    messageText.set(`Сериал ${this.activeItem.serial} добавлен в избранное`);
    messageVisible.set(true);
    hideMessage(messageText, messageVisible);
  }
  private openVideo() {
    this.model.App.route.set("/play");
    this.model.Play.timeBar.set({ playSec: 0, durationSec: 0 });
    this.model.Play.loadingWheel.set(true);
    var url;
    var display = this.model.seriesList.display.get()();
    var activePosition = this.model.seriesList.focusPosition.get();
    var qualityArr = [{ url: display[activePosition].link }];
    if (typeof qualityArr[0].url === "undefined") {
      throw new Error("qualityArr undefined");
    }
    this.pushPlaySerialIconData(display[activePosition]);
    pushHistory(display[activePosition]);
    Play.playControlInterfaceInit();
    var newQualityArr = [];
    qualityArr.forEach(function(item) {
      newQualityArr.unshift(item);
    });
    var url = newQualityArr[0].url;
    newQualityArr[0].activated = true;
    this.model.Play.settingMenu.qualityList.set(newQualityArr);
    setTimeout(() => {
      this.model.Play.loadingWheel.set(false);
    }, 500);
    try {
      if (!url) {
        throw new Error("url not found");
      } else {
        stb.SetVideoState(1);
        new Promise_simple(resolve => {
          stb.Play(`${url}`);
          stbEvent.onEventTmp = function(eventType) {
            if (eventType == 5) {
              resolve(true);
            } else {
              resolve(false);
            }
            setTimeout(() => {
              stbEvent.onEventTmp = function() {};
            }, 1);
          };
        }).then(error => {
          if (error) {
            errorUrlNotFound(url);
          }
        });

        var errorUrlNotFound = function errorUrlNotFound(url) {
          console.log(`error url not found: ${url}`);
          ErrorSeasonNotFound(display[activePosition].seasonId).then(result => {
            stb.Stop();
            console.log(JSON.stringify(result));
            console.log(activePosition);
            stb.Play(result[activePosition].link);
          });
        };
      }
    } catch (e) {
      console.log(e);
    }
  }
  private pushPlaySerialIconData(item) {
    this.model.Play.serialIcon.set({
      name: item.serial,
      img: item.poster
    });
  }
  private activeItem;
}

let timeout;
function hideMessage(messageText, messageVisible) {
  let self: any = hideMessage;
  if (self.execution) {
    clearTimeout(timeout);
  }
  self.execution = true;
  timeout = setTimeout(function() {
    messageText.set(``);
    messageVisible.set(false);
    self.execution = false;
  }, 3000);
}
