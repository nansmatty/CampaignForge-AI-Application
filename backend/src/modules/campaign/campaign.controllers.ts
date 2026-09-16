import { AppError, asyncHandler } from '../../utils/global-error-handler';
import { createCampaign } from './campaign.repository';
import { createCampaignSchema } from './campaign.validation';

export const createCampaignController = asyncHandler(async (req, res) => {
	const campaignValidation = createCampaignSchema.safeParse(req.body);

	if (!campaignValidation.success) {
		throw new AppError('Invalid campaign data', 400);
	}

	const campaign = await createCampaign(campaignValidation.data);
	res.status(201).json(campaign);
});
