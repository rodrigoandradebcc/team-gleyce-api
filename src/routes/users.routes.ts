import { Router, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request: Request, response: Response) => {
  try {
    const {
      full_name,
      cpf,
      date_of_birth,
      plan_type,
      active,
      email,
      phone,
      password,
      observation,
      last_acess,
    } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      full_name,
      cpf,
      date_of_birth,
      plan_type,
      email,
      active,
      phone,
      password,
      observation,
      last_acess,
    });

    return response.json(user);
  } catch (err) {
    // console.log(err);
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.get('/', async (request: Request, response: Response) => {
  const userRepository = getCustomRepository(UsersRepository);
  const users = await userRepository.find();

  return response.json(users);
});

export default usersRouter;
