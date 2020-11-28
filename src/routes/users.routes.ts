import { Router } from 'express';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

const usersRouter = Router();
const usersRepository = new UsersRepository();

usersRouter.post('/', (request, response) => {
  const {
    full_name,
    cpf,
    date_of_birth,
    plan_type,
    email,
    phone,
    password,
    note,
    last_acess,
  } = request.body;
});

export default usersRouter;
