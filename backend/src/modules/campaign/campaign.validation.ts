import { z } from 'zod';

export const createCampaignSchema = z.object({
	name: z.string().trim().min(1, 'Campaign name is required').max(150),
	prompt: z.string().trim().min(1, 'Prompt is required'),
	objective: z.string().trim().min(1).optional(),
	targetAudience: z.string().trim().min(1).optional(),
	useReferenceAssets: z.boolean().optional(),
});
