import { Router } from "express";
import { getAuth } from "../controllers/auth.mjs";


const router = Router()

router.post('/auth', getAuth)
// router.post('/', authVerify)
// router.post('/', authVerify)


export default router
