
import { Router } from "express";
import { getParticipants } from "../controllers/tipoDeParticipante.mjs";

const router = Router()

router.get('/participants', getParticipants)
// router.post('/', authVerify)
// router.post('/', authVerify)


export default router
