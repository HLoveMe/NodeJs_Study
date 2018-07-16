var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var fs = require('fs');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//
app.set("base", __dirname)
var keyDirpath = path.join(__dirname, "media")
app.set("media", keyDirpath)
var fileDir = path.join(keyDirpath,"files")
app.set("filePath",fileDir)


//文件下载
var downloadRouter = express.Router()
downloadRouter.get("/down/:path/:name", function(req, res, next) {
    var _path = req.app.get("filePath")
    var name = req.params.name
    var __path = req.params.path
    _path = path.join(_path,__path)
    if(fs.existsSync(_path)){
        res.download(_path,name);    
    }else{
        res.json({status:404,reason:"文件不存在"})
    }
})
app.use("/filedown",downloadRouter)
export default app;
