var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render("share/keyshare")
});
router.post("/", function(req, res) {
    var data = req.body.data.toString()
    try {
        var fileDirpath = req.app.get("media");
        fileDirpath = path.join(fileDirpath, "keys")
        var filepath = path.join(fileDirpath, "key.txt")
        var content = data + "_KEYSHARE_";
        fs.writeFile(filepath, content, { flag: "a+" }, function(err) {
            if (err != null) {
                res.json({ status: 404, info: "写入文件错误" })
            } else {
                res.json({ keyword: data, status: 200 })
            }
            fs.stat(filepath, function(err, info) {
                if (info.size >= 1024) {
                    //>8k
                    fs.writeFile(filepath, "", { flag: "w+" }, function(err) {})
                }
            })
        })

    } catch (e) {
        console.log("12121", e)
        res.json({ status: 400, error: e })
    }

})

module.exports = router;