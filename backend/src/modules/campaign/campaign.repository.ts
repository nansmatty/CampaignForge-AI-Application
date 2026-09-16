import { db } from '../../db';
import { campaigns } from '../../db/schema/campaign.schema';
import { CreateCampaignInput } from './campaign.validation';

export async function createCampaign(input: CreateCampaignInput) {
	const [campaign] = await db
		.insert(campaigns)
		.values({ ...input, status: 'draft' })
		.returning();

	return campaign;
}
