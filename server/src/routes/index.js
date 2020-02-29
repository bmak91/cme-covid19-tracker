const express = require('express');
const router = express.Router();

router.post('/info/:key?', require('./info'));
router.post('/save', require('./save'));

module.exports = router;
