import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';
import { AppError } from '../utils/global-error-handler';
import { env } from '../config/env';

export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
	let error = err;

	if (err.name === 'JsonWebTokenError') {
		error = new AppError('Invalid token. Please log in again!', 401);
	}

	if (err.name === 'TokenExpiredError') {
		error = new AppError('Token expired! Please log in again.', 401);
	}

	const statusCode = error.statusCode || 500;
	let message = error.message || 'Internal Server Error';

	logger.error('Error occurred', {
		message: error.message,
		statusCode,
		stack: error.stack,
		requestId: req.requestId,
		method: req.method,
		url: req.originalUrl,
		ip: req.ip,
		userAgent: req.get('user-agent'),
	});

	if (env.NODE_ENV === 'production' && !error.isOperational) {
		message = 'Something went wrong';
	}

	return res.status(statusCode).json({
		success: false,
		error: message,
		requestId: req.requestId,
	});
};
