import SeasonListComponent from "./SeasonListComponent";

export default class UpdateListComponent extends SeasonListComponent {
    protected createTitle (item) {
        return `${item.name} (${item.message})`
      }
}