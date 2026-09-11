import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const assets = pgTable('assets', {
	id: uuid('id').defaultRandom().primaryKey(),

	storage_key: varchar('storage_key', { length: 255 }).notNull(),

	original_name: varchar('original_name', { length: 255 }).notNull(),

	mime_type: varchar('mime_type', { length: 255 }).notNull(),

	created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
