import 'dotenv/config';
import { env } from './config/env';
import app from './app';
import logger from './utils/logger';
import { closeDB, connectDB } from './db';
import { Server } from 'node:http';

const PORT = env.PORT || 5241;

let server: Server | undefined;

process.on('uncaughtException', async (err: Error) => {
	logger.error('Uncaught Exception:', { message: err.message, stack: err.stack });
	await shutdown('Uncaught Exception', 1);
});

process.on('unhandledRejection', async (reason: any, promise: Promise<any>) => {
	logger.error('UNHANDLED REJECTION! 💥 Shutting down...', {
		promise,
		reason: reason.message || reason,
		stack: reason.stack || 'No stack trace available',
	});

	await shutdown('Unhandled promise rejection', 1);
});

// Graceful shutdown on SIGTERM
process.on('SIGTERM', async () => await shutdown('SIGTERM signal received', 0));

// Graceful shutdown on SIGINT (e.g., Ctrl+C)
process.on('SIGINT', async () => await shutdown('SIGINT signal received', 0));

const startServer = async () => {
	try {
		await connectDB();

		server = app.listen(PORT, () => {
			logger.info(`Server is running on port ${PORT}`);
			logger.info(`Environment: ${env.NODE_ENV}`);
		});
	} catch (error) {
		logger.error('Error starting server:', error);
		process.exit(1);
	}
};

async function shutdown(reason: string, exitCode: number = 0) {
	logger.info(`Shutdown initiated. Reason: ${reason}`);
	if (server) {
		server.close(async () => {
			logger.info(`HTTP server closed. Reason: ${reason}`);
			await closeDB();
			process.exit(exitCode);
		});
	} else {
		await closeDB();
		process.exit(exitCode);
	}
}

startServer();
