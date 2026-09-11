import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { assets } from './assets.schema';
import { campaigns } from './campaign.schema';

export const campaignAssets = pgTable('campaign_assets', {
	campaignId: uuid('campaign_id')
		.notNull()
		.references(() => campaigns.id, { onDelete: 'cascade' }),

	assetId: uuid('asset_id')
		.notNull()
		.references(() => assets.id, { onDelete: 'cascade' }),

	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
