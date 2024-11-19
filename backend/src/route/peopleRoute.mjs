import { Router } from "express";
import { newStuden } from "../controllers/people.mjs";

const router = Router()

router.post('/people', newStuden)
// router.post('/', authVerify)
// router.post('/', authVerify)


export default router
