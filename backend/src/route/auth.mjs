import { Router } from "express";
import { singIn } from "../controllers/auth.mjs";


const router = Router()

// router.post('/api/auth/singUp', singUp)
router.post('/api/auth/singIn', singIn)



export default router
