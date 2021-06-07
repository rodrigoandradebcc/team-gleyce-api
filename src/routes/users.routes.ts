import { Router, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';
import ChangeActiveUserService from '../services/ChangeActiveUserService';
import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import DeleteStudentService from '../services/DeleteStudentService';

const usersRouter = Router();

usersRouter.use(ensureAuthenticated);

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

    return response.status(201).json(user);
  } catch (err) {
    // console.log(err);
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deleteUser = new DeleteStudentService();

    await deleteUser.execute({ id });

    return response.status(204).send();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.get('/', async (request: Request, response: Response) => {
  const userRepository = getCustomRepository(UsersRepository);
  const users = await userRepository.find();

  return response.json(users);
});

usersRouter.patch('/change-active/:id', async (request, response) => {
  try {
    const { active } = request.body;
    const { id } = request.params;

    const changeActive = new ChangeActiveUserService();

    const newStatus = await changeActive.execute({ id, active });

    return response.status(201).json({
      message: `O usuário está ${newStatus ? 'ativo' : 'desativo'}`,
    });
  } catch (err) {
    return response.status(400).json({
      error: err.message,
    });
  }
});

export default usersRouter;
