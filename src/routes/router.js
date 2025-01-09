const express = require('express');
const router = express.Router();

const task = require('./Task.route');

router.use('/task', task);

module.exports = router;