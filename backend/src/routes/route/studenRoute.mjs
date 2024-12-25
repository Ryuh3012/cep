
import { Router } from "express";
import { newStuden, updateStudent } from "../../controllers/studen.mjs";
import { verifytokenMiddleware, verifyUser } from "../../middlewares/verifytokenMiddleware.mjs";

const router = Router()

router.post('/api/studen', newStuden)
router.put('/api/studen/update/:cedula', [verifytokenMiddleware, verifyUser, updateStudent])

export default router
