import { z } from 'zod';

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
	PORT: z.coerce.number().default(5241),

	DATABASE_URL: z.url('DATABASE_URL must be a valid URL'),
	DIRECT_URL: z.url('DIRECT_URL must be a valid URL'),
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
