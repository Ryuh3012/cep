import { Router } from "express";
import { getCourse, newCourses } from "../../controllers/courses.mjs";
const router = Router()

router.get('/api/courses/', getCourse)
router.post('/api/courses/new', newCourses)



export default router
