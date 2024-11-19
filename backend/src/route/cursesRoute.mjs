import { Router } from "express";
import { getCourse } from "../controllers/courses.mjs";

const router = Router()

router.get('/cursos', getCourse)
// router.post('/', authVerify)
// router.post('/', authVerify)


export default router
