var express = require('express');
var fs = require('fs');
var path = require('path');

var router = express.Router()
router.get("/", function(req, res) {
    var media = req.app.get("media");
    var keyDirpath = path.join(media, "keys")
    var keysahre = path.join(keyDirpath, "key.txt")

    var filesp = path.join(media, "files");

    try {
        var buffer = fs.readFileSync(keysahre, { encoding: "utf-8" })
        var content = buffer.toString("utf-8")
        var contents = content.split("_KEYSHARE_")
        res.locals.keyword = contents.length >= 2 ? contents[contents.length - 2] : ""

        var lastname = req.app.get("last_file");
        if (lastname == null) {
            var names = fs.readdirSync(filesp);
            var one = null
            var last = -1
            for (var index in names) {
                let name = names[index];
                let fileP = path.join(filesp, name)
                let state = fs.statSync(fileP)
                if (last == -1) {
                    one = name
                    last = 0
                } else {
                    let state = fs.statSync(fileP)
                    let time = (new Date(state.ctime)).getTime()
                    if (time > last) {
                        one = name;
                        last = time;
                    }
                }
            }
            if (one != null) {
                req.app.set("last_file", one)
            }
            res.locals.lastname = one;
        } else {
            res.locals.lastname = lastname;
        }


        res.render("home")
    } catch (e) {
        console.log(e)
        res.locals.keyword = ""
        res.render("home")
    }




    // fs.open(keysahre, "r", function(err, _fs) {
    //     if (err == null) {
    //         var buffer = new Buffer(1100)

    //         fs.read(_fs, buffer, 0, 1100, 0, function(err, bytesRead, buffer) {
    //             if (err == null) {
    //                 var content = buffer.slice(0, bytesRead).toString();
    //                 var contents = content.split("_KEYSHARE_")
    //                 res.locals.keyword = contents.length >= 2 ? contents[contents.length - 2] : ""
    //                 res.render("home")
    //             } else {
    //                 res.render("home")
    //             }
    //         })
    //     } else {
    //         res.render("home")
    //     }
    // })


})


module.exports = router;