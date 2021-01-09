import { Router } from 'express';

import usersRouter from './users.routes';
import appoinmentsRouter from './appointment.routes';
import trainingsRouter from './trainings.routes';
import plansRouter from './plans.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/appoinments', appoinmentsRouter);
routes.use('/trainings', trainingsRouter);
routes.use('/plans', plansRouter);

export default routes;
