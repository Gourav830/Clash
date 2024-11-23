import { rateLimit } from 'express-rate-limit'

export const applimiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 100, 
	standardHeaders: 'draft-7',
	legacyHeaders: false, 
})
export const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 30, 
	standardHeaders: 'draft-7',
	legacyHeaders: false, 
})
