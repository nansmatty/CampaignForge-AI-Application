import { db } from '../../db';
import { campaigns } from '../../db/schema/campaign.schema';

export type NewCampaign = typeof campaigns.$inferInsert;

export async function createCampaignRepo(input: NewCampaign) {
	const [campaign] = await db.insert(campaigns).values(input).returning();

	return campaign;
}
