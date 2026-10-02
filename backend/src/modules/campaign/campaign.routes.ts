import { Router } from 'express';
import { createCampaignController } from './campaign.controllers';

const router = Router();

router.post('/', createCampaignController);

export default router;
