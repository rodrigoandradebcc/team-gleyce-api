import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const {
      full_name,
      cpf,
      date_of_birth,
      plan_type,
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

export default usersRouter;
