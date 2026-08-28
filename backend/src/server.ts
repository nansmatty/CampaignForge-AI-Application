import 'dotenv/config';
import { env } from './config/env';
import app from './app';
import logger from './utils/logger';
import { closeDB, connectDB } from './db';

const PORT = env.PORT || 5241;

process.on('uncaughtException', (err: Error) => {
	logger.error('Uncaught Exception:', { message: err.message, stack: err.stack });
	process.exit(1);
});

let server: any;

const startServer = async () => {
	try {
		await connectDB();

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
				server.close(async () => {
					logger.info('HTTP server closed. SIGTERM received');
					await closeDB();
					process.exit(0);
				});
			}
		});

		// Graceful shutdown on SIGINT (e.g., Ctrl+C)
		process.on('SIGINT', () => {
			logger.info('SIGINT signal received: Shutting down HTTP server...');
			if (server) {
				server.close(async () => {
					logger.info('HTTP server closed. SIGINT received');
					await closeDB();
					process.exit(0);
				});
			}
		});
	} catch (error) {
		logger.error('Error starting server:', error);
		process.exit(1);
	}
};

startServer();
