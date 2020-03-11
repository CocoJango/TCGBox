const express = require('express');
const router = express.Router();
const TCG = require('../controllers/tcg.controller');

router.post('/', TCG.create);
router.get('/', TCG.getAll);

module.exports = router;
