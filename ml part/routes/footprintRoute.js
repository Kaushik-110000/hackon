const express = require('express');
const router = express.Router();
const { calculateFootprint } = require('../controller/footprintController');

router.post('/calculate', calculateFootprint);

module.exports = router;
