var childProcess = require('child_process');

setInterval(function () {
    childProcess.exec('php updateListDeamon.php')
},5000)