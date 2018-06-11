var exec = require('child_process').exec

exec("npm run build")

ChildProcess = exec("node ./build/index.js")

ChildProcess.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
});

ChildProcess.stderr.on('data', function(data) {
    console.log('stdout: ' + data);
});

ChildProcess.on('close', function(code) {
    console.log('closing code: ' + code);
});