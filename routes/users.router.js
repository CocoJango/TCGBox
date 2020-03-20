const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const fs = require('fs');
const validator = require('express-validator');

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

router.post('/', [
        validator.check('email').isEmail(),
        validator.check('name', 'User name required').trim().isLength({min: 1}).escape(),
        validator.check('password', 'Password should be 6 long').isLength({min: 6})
    ],
    function (req, res) {
        const userFile = '../db/user.json';
        fs.access(userFile, fs.constants.F_OK, (err) => {
            err ? userController.create(req, res) : res.render('index', {title: 'Test Title', stuff: {name: 'test'}});;
        });
    }
);

module.exports = router;
