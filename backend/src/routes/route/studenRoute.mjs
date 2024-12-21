
import { Router } from "express";
import { newStuden } from "../../controllers/studen.mjs";

const router = Router()

router.post('/api/studen', newStuden)

export default router
