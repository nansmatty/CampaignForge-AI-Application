import { varchar, text, uuid, pgTable, timestamp, boolean } from 'drizzle-orm/pg-core';

export const campaigns = pgTable('campaigns', {
	id: uuid('id').defaultRandom().primaryKey(),

	name: varchar('name', { length: 255 }).notNull(),

	prompt: text('prompt').notNull(),

	objective: text('objective'),

	targetAudience: text('target_audience'),

	useReferenceAssets: boolean('use_reference_assets').notNull().default(false),

	status: varchar('status', { length: 50 }).notNull().default('draft'),

	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),

	updatedAt: timestamp('updated_at', { withTimezone: true })
		.defaultNow()
		.notNull()
		.$onUpdate(() => new Date()),
});
