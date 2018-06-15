var exec = require('child_process').exec

exec("node_modules/.bin/tsc && node FileCopy.js", (err) => {
    if (err == null) {
        ChildProcess = exec("node ./build/index.js")
        ChildProcess.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });
        ChildProcess.stderr.on('data', function (data) {
            console.log('stdout: ' + data);
        });
        ChildProcess.on('close', function (code) {
            console.log('closing code: ' + code);
        });
    }
})
