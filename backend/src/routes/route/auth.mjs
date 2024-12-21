import { Router } from "express";
import { profile, signUp, singIn } from "../../controllers/auth.mjs";
import { verifytokenMiddleware } from "../../middlewares/verifytoken.mjs";



const router = Router()

router.post('/api/auth/singUp', signUp)
router.post('/api/auth/singIn', singIn)
router.get('/api/auth/profile', [verifytokenMiddleware, profile])



export default router
