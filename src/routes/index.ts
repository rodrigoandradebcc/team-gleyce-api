import { Router } from 'express';

import usersRouter from './users.routes';
import appointmentsRouter from './appointment.routes';
import trainingsRouter from './trainings.routes';
import plansRouter from './plans.routes';
import exercisesRouter from './exercises.routes';
import prescriptionRouter from './prescription.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/appointments', appointmentsRouter);
routes.use('/trainings', trainingsRouter);
routes.use('/plans', plansRouter);
routes.use('/exercises', exercisesRouter);
routes.use('/prescriptions', prescriptionRouter);

export default routes;
