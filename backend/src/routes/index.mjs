import { Router } from 'express';
import authRoute from './route/auth.mjs';
import cursesRoute from './route/cursesRoute.mjs';
import personaRoute from './route/studenRoute.mjs';
import participantsRoute from './route/participantsRoute.mjs';
import facilitadorRoute from './route/facilitators.mjs';

const router = Router();

router.use(authRoute);
router.use(cursesRoute);
router.use(personaRoute);
router.use(participantsRoute);
router.use(facilitadorRoute);

export default router;