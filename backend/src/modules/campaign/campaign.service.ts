import { CreateCampaignInput } from './campaign.validation';
import { createCampaignRepo, type NewCampaign } from './campaign.repository';

export async function createCampaignService(input: CreateCampaignInput) {
	const newCampaign: NewCampaign = { ...input, status: 'draft' };
	return createCampaignRepo(newCampaign);
}
