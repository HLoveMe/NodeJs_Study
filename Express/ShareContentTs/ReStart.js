var fs = require("fs")
var path = require("path")

let _path = path.join(__dirname, "build")

function deleteall(path) {
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteall(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }

};
deleteall(_path)

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
