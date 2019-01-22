const seasonvar = require('seasonvar-api');
const SA = new seasonvar({
    key: '032a4972'
});


module.exports = {
    getSesonList: function getSesonList (id) {
        return new Promise(function (resolve) {
            var options = {
                id: id
            };
            SA.getSeasonList(options, function(err, list){
                resolve(list)
            });
        })
    }
}