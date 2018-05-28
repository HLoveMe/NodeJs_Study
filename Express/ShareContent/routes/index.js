var express = require('express');
var router = express.Router();

var router = express.Router()
router.get("/", function(req, res) {
    res.render("index", { req })
})


module.exports = router;