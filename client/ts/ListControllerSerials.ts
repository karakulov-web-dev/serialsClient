import ListController from "./ListController";
import RouteManager from "./RouteManager"
import {getSeasons,getSerials,getSeason} from "./HTTP"
import createPrevViewData from "./createPrevViewData"

new RouteManager().set

export default class ListControllerSerials extends ListController {
  public onEnter() {
    this.defineActiveItem();
    this.openSerial();
  }
  private defineActiveItem() {
    let focusPosition = this.focusPosition.get();
    let display = this.display.get()();
    this.activeItem = display[focusPosition];
  }
  private openSerial() {
    if (this.activeItem.seasons_number > 1) {
      this.openSeasonList()
    } else {
      this.openSeriesList()
    }
  }
  private openSeriesList() {
    new RouteManager().set("/seriesList");
    let list: any = this.model.getInstance("seriesList").getValue("list")
    this.model.seriesList.scrolPosition.set(0)
    this.model.seriesList.focusPosition.set(0)
    let seasonsIdList = JSON.parse(this.activeItem.seasonListIdJson);
    let seasonId = seasonsIdList[0];
    list.set(createPrevViewData())
    getSeason(seasonId).then(data => {
      data.playlist.forEach(item => {
        item.poster = data.poster;
        item.season_number = data.season_number;
        item.serial = data.name
      })
      list.set(data.playlist)
    })
  }
  private openSeasonList() {
    new RouteManager().set("/seasonList");
    let list: any = this.model.getInstance("seasonList").getValue("list")
    this.model.seasonList.scrolPosition.set(0)
    this.model.seasonList.focusPosition.set(0)
    list.set(createPrevViewData())
    getSeasons(JSON.parse(this.activeItem.seasonListIdJson)).then(data => {
      list.set(data)
    })
  }
  protected infiniteScroll () {
    let length = this.model.serialList.list.get().length
    let scrolPosition = this.model.serialList.scrolPosition.get()
    let dif = length - scrolPosition
    if (dif < 20) {
      this.addContent()
    }
  }
  private addContent () {
    let length = this.model.serialList.list.get().length
    let currentList = this.model.serialList.list.get()
    getSerials({limit: 50, offset: length}).then(data => {
      currentList = currentList.concat(data)
      this.model.serialList.list.set(currentList)
    })
  }
  private activeItem;
}
