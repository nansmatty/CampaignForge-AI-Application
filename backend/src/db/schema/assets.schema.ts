import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const assets = pgTable('assets', {
	id: uuid('id').defaultRandom().primaryKey(),

	type: varchar('type', { length: 50 }).notNull(),

	storageKey: text('storage_key').notNull(),

	originalName: varchar('original_name', { length: 255 }).notNull(),

	mimeType: varchar('mime_type', { length: 255 }).notNull(),

	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
