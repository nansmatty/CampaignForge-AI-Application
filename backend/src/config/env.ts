import { z } from 'zod';

const envSchema = z.object({
	PORT: z.coerce.number().default(5241),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
	console.error('Invalid environment variables');

	console.error(
		parsedEnv.error.issues.map((issue) => ({
			path: issue.path.join('.'),
			message: issue.message,
		})),
	);
	process.exit(1);
}

export const env = parsedEnv.data;
