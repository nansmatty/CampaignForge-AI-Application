import express from 'express';
import crypto from 'crypto';
import { notFoundHandler } from './middlewares/not-found-middleware';
import { errorHandler } from './middlewares/error-middleware';

const app = express();

app.use((req, _res, next) => {
	req.requestId = crypto.randomUUID();
	next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
