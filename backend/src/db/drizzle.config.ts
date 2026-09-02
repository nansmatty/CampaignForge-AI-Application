import { defineConfig } from 'drizzle-kit';
import { env } from '../config/env';

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/db/schema/*.ts',
	out: './src/db/migrations',
	dbCredentials: {
		url: env.DATABASE_URL,
	},

	// Drizzle needs to remember what migrations have been applied to the database.
	migrations: {
		table: '__drizzle_migrations',
		schema: 'drizzle',
	},

	// Our campaignforge apps table will live at public folder. So if Drizzle is inspecting/managing
	// Postgresql schemas concern yourself with public.
	schemaFilter: ['public'],

	// This controls which tables drizzle kit manages. Currently, it is set to manage all tables or wildcard.
	// But later on as we develop more tables, we might want to restrict this to specific tables.
	tablesFilter: '*',

	// Enable breakpoints for debugging and development purposes. Not a production feature.
	breakpoints: true,

	// Enable verbose logging for debugging and development purposes. Not a production feature.
	verbose: true,
});
