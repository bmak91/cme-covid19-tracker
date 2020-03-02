const express = require('express');
const router = express.Router();

router.post('/info/:referrerKey?', require('./person/info'));
router.post('/save', require('./person/save'));
router.get('/communities', require('./community/search'));
router.post('/communities', require('./community/save'));

module.exports = router;
