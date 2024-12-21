import { Router } from "express";
import { getCourse, newCourses } from "../../controllers/courses.mjs";
const router = Router()

router.get('/api/courses/data', getCourse)
router.post('/api/courses/new', newCourses)



export default router
