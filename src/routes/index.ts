import { Router } from 'express';

import usersRouter from './users.routes';
import appoinmentsRouter from './appointment.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/appoinments', appoinmentsRouter);

export default routes;
