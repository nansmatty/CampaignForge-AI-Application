import { varchar, text, uuid, pgTable, timestamp } from 'drizzle-orm/pg-core';

export const campaigns = pgTable('campaigns', {
	id: uuid('id').defaultRandom().primaryKey(),

	name: varchar('name', { length: 255 }).notNull(),

	prompt: text('prompt').notNull(),

	objective: text('objective'),

	targetAudience: text('target_audience'),

	status: varchar('status', { length: 50 }).notNull().default('draft'),

	created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),

	updated_at: timestamp('updated_at', { withTimezone: true })
		.defaultNow()
		.notNull()
		.$onUpdate(() => new Date()),
});
