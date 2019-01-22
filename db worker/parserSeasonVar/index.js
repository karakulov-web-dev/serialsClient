let HTTP = require("./HTTP")


let receivedId = {}

let maxId = 25000;
let id = 12000;

let interval = setInterval(function () {
    id++
    if (id > maxId) {
        clearInterval(interval)
        console.log(']')
    }
    if (typeof receivedId[id] === 'undefined') {
        action(id)
    }
},15000)

console.log('[')

function action(id) {
    HTTP.getSesonList(id).then((data)=> {
        if (typeof data.error === 'undefined') {
            data.forEach(function (item) {
                receivedId[item.id] = true
                item.rating.imdb = item.rating.imdb.ratio
                item.rating.kinopoisk = item.rating.kinopoisk.ratio
            })
            console.log(data)
            console.log(',')
        }
    })
}



