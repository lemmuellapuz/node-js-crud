const express = require('express');
const router = express.Router();

const helmet = require('helmet');
const limiter = require('../middlewares/RateLimiter.middleware'); 
const errorHandler = require('../middlewares/ErrorHandler.middleware');
const sanitizeRequest = require('../middlewares/SanitizeRequest.middleware');

const task = require('./Task.route');
const auth = require('./Authentication.route');

//MIDDLEWARES
router.use(express.json())
router.use(helmet());
router.use(limiter);
router.use(sanitizeRequest);

router.use(auth);
router.use('/task', task);

router.use(errorHandler);

module.exports = router;