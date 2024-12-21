import { Router } from "express";
import { newfacilitators } from "../../controllers/facilitators.mjs";

const router = Router()

router.post('/api/facilitators', newfacilitators)

export default router