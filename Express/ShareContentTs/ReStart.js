var exec = require('child_process').exec

exec("npm run build && node FileCopy.js && ./node_modules/.bin/nodemon ./build/index.js")