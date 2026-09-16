import { CreateCampaignInput } from './campaign.validation';
import * as campaignRepos from './campaign.repository';

export async function createCampaign(input: CreateCampaignInput) {
	return campaignRepos.createCampaign(input);
}
