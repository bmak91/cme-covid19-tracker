const express = require('express');
const router = express.Router();

router.post('/info/:hash', require('./info'));
router.post('/save', require('./save'));

module.exports = router;
