import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { env } from '../config/env';
import logger from '../utils/logger';

const client = postgres(env.DATABASE_URL, {
	prepare: false,

	// connection pool
	max: env.DB_POOL_MAX, // maximum number of connections in the pool

	// connection lifecycle
	connect_timeout: env.DB_CONNECT_TIMEOUT, // time in seconds to wait for a connection to be established before timing out
	idle_timeout: env.DB_IDLE_TIMEOUT, // time in seconds before an idle connection is closed
	max_lifetime: 60 * 30, // maximum time in seconds a connection can live before being closed
});

export const db = drizzle(client);

export const connectDB = async (): Promise<void> => {
	try {
		await client`SELECT 1`;
		logger.info('Postgres connection established successfully');
	} catch (error) {
		logger.error('Failed to connect to the database:', { error });
		throw error;
	}
};

export const checkDBHealth = async (): Promise<boolean> => {
	try {
		await client`SELECT 1`;
		return true;
	} catch (error) {
		logger.error('Database health check failed:', { error });
		return false;
	}
};

export const closeDB = async (): Promise<void> => {
	try {
		await client.end();
		logger.info('Postgres connection closed successfully');
	} catch (error) {
		logger.error('Failed to close the database connection:', { error });
		throw error;
	}
};
