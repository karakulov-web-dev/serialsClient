import ListControllerSerials from "./ListControllerSerials";
import {getUpdateList,getSeason} from "./HTTP"
import RouteManager from "./RouteManager"
import createPrevViewData from "./createPrevViewData"

export default class ListControllerUpdatesList extends ListControllerSerials {
  protected openSerial() {
      this.openSeriesList()
  }
  protected openSeriesList() {
    new RouteManager().set("/seriesList");
    let list: any = this.model.getInstance("seriesList").getValue("list")
    this.model.seriesList.scrolPosition.set(0)
    this.model.seriesList.focusPosition.set(0)
    list.set(createPrevViewData())
    getSeason(this.activeItem.idSeasonvar).then(data => {
      data.playlist.forEach(item => {
        item.poster = data.poster;
        item.season_number = data.season_number;
        item.serial = data.name
      })
      list.set(data.playlist)
    })
  }
  protected addContent () {
    let length = this.model.updateList.list.get().length
    let currentList = this.model.updateList.list.get()
    getUpdateList(length).then(data => {
      currentList = currentList.concat(data)
      this.model.updateList.list.set(currentList)
    })
  }
  protected infiniteScroll () {
    let length =  this.model.updateList.list.get().length
    let scrolPosition = this.model.updateList.scrolPosition.get()
    let dif = length - scrolPosition
    if (dif < 20) {
      this.addContent()
    }
  }
}
