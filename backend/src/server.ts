import 'dotenv/config';
import { env } from './config/env';
import app from './app';
import logger from './utils/logger';
import { client } from './db';

const PORT = env.PORT || 5241;

process.on('uncaughtException', (err: Error) => {
	logger.error('Uncaught Exception:', { message: err.message, stack: err.stack });
	process.exit(1);
});

let server: any;

const startServer = async () => {
	try {
		await client`SELECT 1`;

		server = app.listen(PORT, () => {
			logger.info(`Server is running on port ${PORT}`);
			logger.info(`Environment: ${env.NODE_ENV}`);
		});

		// Handle unhandled promise rejections
		process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
			logger.error('UNHANDLED REJECTION! 💥 Shutting down...', {
				promise,
				reason: reason.message || reason,
				stack: reason.stack || 'No stack trace available',
			});

			server.close(() => {
				process.exit(1);
			});
		});

		// Graceful shutdown on SIGTERM
		process.on('SIGTERM', () => {
			logger.info('SIGTERM signal received: Shutting down HTTP server...');
			if (server) {
				server.close(() => {
					logger.info('HTTP server closed');
				});
			}
		});
	} catch (error) {
		logger.error('Error starting server:', error);
		process.exit(1);
	}
};

startServer();
