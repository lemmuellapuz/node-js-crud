import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	limit: 50,
	standardHeaders: 'draft-8',
	legacyHeaders: false,
})

module.exports = limiter;