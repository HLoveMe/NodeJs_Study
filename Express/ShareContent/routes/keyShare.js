var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render("keyShare/keyshare")
});

module.exports = router;