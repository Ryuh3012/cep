
import { Router } from "express";
import { getParticipants } from "../../controllers/tipoDeParticipante.mjs";

const router = Router()

router.get('/api/participants', getParticipants)

export default router
