import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

export const campaignAssets = pgTable('campaign_assets', {
	campaign_id: uuid('campaign_id').notNull(),

	asset_id: uuid('asset_id').notNull(),

	created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
