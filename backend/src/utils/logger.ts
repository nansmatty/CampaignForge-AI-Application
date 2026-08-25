import winston from 'winston';
import { env } from '../config/env';

const isProduction = env.NODE_ENV === 'production';

const loggerFormat = winston.format.combine(
	winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	winston.format.errors({ stack: true }), // Include stack trace in error logs
	winston.format.splat(),
	winston.format.json(),
);

const consoleFormat = winston.format.combine(
	winston.format.colorize(),
	winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	winston.format.printf(({ timestamp, level, message, ...meta }) => {
		const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta, null, 2)}` : '';
		return `${timestamp} [${level}]: ${message}${metaStr}`;
	}),
);

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	transports: [
		new winston.transports.Console({
			format: isProduction ? loggerFormat : consoleFormat,
		}),
	],
});

if (isProduction) {
	logger.add(
		new winston.transports.File({
			filename: 'logs/error.log',
			level: 'error',
			maxsize: 5242880, // 5MB
			maxFiles: 5,
		}),
	);

	logger.add(
		new winston.transports.File({
			filename: 'logs/combined.log',
			maxsize: 5242880, // 5MB
			maxFiles: 5,
		}),
	);
}

export default logger;
