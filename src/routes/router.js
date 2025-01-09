const express = require('express');
const router = express.Router();

const task = require('./Task.route');
const auth = require('./Authentication.route');

router.use('/task', task);
router.use(auth);

module.exports = router;