import { getCustomRepository } from 'typeorm';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  full_name: string;
  cpf: string;
  date_of_birth: Date;
  plan_type: string;
  email: string;
  phone: string;
  password: string;
  observation: string;
  last_acess: Date;
}

class CreateUserService {
  public async execute({
    full_name,
    cpf,
    date_of_birth,
    plan_type,
    email,
    phone,
    password,
    observation,
    last_acess,
  }: Request): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = usersRepository.create({
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

    await usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;
