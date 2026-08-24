import express from 'express';
import crypto from 'crypto';

const app = express();

app.use((req, _res, next) => {
	req.requestId = crypto.randomUUID();
	next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

export default app;
