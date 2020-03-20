const express = require('express');
const router = express.Router();
const fs = require('fs');
/* GET home page. */
router.get('/', function (req, res, next) {
    if (!fs.existsSync('../db/user.json')) {
        res.render('setup/setup', { title: 'Welcome to TCGBox' });
    } else {
        res.render('index', {title: process.env.TITLE, stuff: {name: 'test'}});
    }
});

module.exports = router;
