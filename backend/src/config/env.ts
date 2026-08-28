import { z } from 'zod';

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
	PORT: z.coerce.number().default(5241),

	DATABASE_URL: z.url({ error: 'DATABASE_URL must be a valid PostgreSQL URL' }),
	DB_POOL_MAX: z.coerce.number().default(10),
	DB_CONNECT_TIMEOUT: z.coerce.number().default(20),
	DB_IDLE_TIMEOUT: z.coerce.number().default(30),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
	console.error('❌ Invalid environment variables');

	console.error(
		parsedEnv.error.issues.map((issue) => ({
			path: issue.path.join('.'),
			message: issue.message,
		})),
	);
	process.exit(1);
}

export const env = parsedEnv.data;
