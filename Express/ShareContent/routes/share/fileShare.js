var express = require('express');
var router = express.Router();
var multer = require("multer");
var fs = require('fs');
var path = require('path');

var upload = multer({ dest: "media/files" })

router.get('/', function(req, res, next) {
    res.render("share/fileshare")
});
router.post("/", upload.single("filename"), function(req, res) {
    var file = req.file;
    if (file == null) {
        res.redirect(301, "/");
        return
    }
    var base = req.app.get("base");
    var filep = path.join(base, file.path)
    var _filep = filep.replace(file.filename, file.originalname)
    fs.rename(filep, _filep, function(err, info) {
        //设置最近文件
        req.app.set('last_file', file.originalname)
        res.redirect(301, "/");
    })
})

module.exports = router;