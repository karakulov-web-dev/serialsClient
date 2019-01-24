import BaseComponent from "./BaseComponent";

export default class GenreSelectComponent extends BaseComponent {
    constructor () {
        super()
        this.route = this.model.getInstance('App').getValue('route')
        this.route.subscribe(this)
    }
    protected create() {
        let div = document.createElement('div')
        let route = this.route.get()
        if (this.route.get().split('/')[2] !== 'genreManager') {
            return div
        }
        div.className = 'app_home_genreManager'
        div.appendChild(this.createWin())
        return div
    }
    private createWin() {
        let div = document.createElement('div');
        let header = document.createElement('div')

        div.className = 'app_home_genreManager_window'
        header.className = 'app_home_genreManager_window_header'

        header.innerHTML = 'Жанры'

        div.appendChild(header)
        return div
    }
    private route
}