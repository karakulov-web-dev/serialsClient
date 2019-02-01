import ListControllerSerials from "./ListControllerSerials";
import {getUpdateList} from "./HTTP"

export default class ListControllerUpdatesList extends ListControllerSerials {
  protected openSerial() {
      this.openSeriesList()
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
