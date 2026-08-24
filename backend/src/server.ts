import 'dotenv/config';
import { env } from './config/env';
import app from './app';

const PORT = env.PORT || 5241;

process.on('uncaughtException', (err: Error) => {
	console.error('Uncaught Exception:', err);
	process.exit(1);
});

let server: any;

const startServer = async () => {
	try {
		server = app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
			console.log(`Environment: ${env.NODE_ENV}`);
		});

		// Handle unhandled promise rejections
		process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
			console.error('Unhandled Rejection at:', {
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
			console.log('SIGTERM signal received: closing HTTP server');
			if (server) {
				server.close(() => {
					console.log('HTTP server closed');
				});
			}
		});
	} catch (error) {
		console.error('Error starting server:', error);
		process.exit(1);
	}
};

startServer();
