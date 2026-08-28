import express from 'express';
import crypto from 'crypto';
import { notFoundHandler } from './middlewares/not-found-middleware';
import { errorHandler } from './middlewares/error-middleware';
import { checkDBHealth } from './db';

const app = express();

app.use((req, _res, next) => {
	req.requestId = crypto.randomUUID();
	next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/health', async (_req, res) => {
	const dbHealth = await checkDBHealth();
	res.status(dbHealth ? 200 : 500).json({
		status: dbHealth ? 'healthy' : 'unhealthy',
		timestamp: new Date().toISOString(),
		uptime: process.uptime(),
		database: dbHealth ? 'connected' : 'disconnected',
	});
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
