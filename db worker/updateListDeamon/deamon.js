var childProcess = require('child_process');

childProcess.exec('php updateListDeamon.php')

setInterval(function () {
    childProcess.exec('php updateListDeamon.php >> updateListDeamon.logfile')
},86400000)