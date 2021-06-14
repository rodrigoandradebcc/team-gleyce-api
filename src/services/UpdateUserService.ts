import { isBefore, isEqual, startOfDay } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';
import AppError from '../shared/AppError';

interface Request {
  id: string;
  full_name: string;
  cpf: string;
  date_of_birth: Date;
  plan_type: string;
  email: string;
  phone: string;
  password: string;
  observation: string;
  last_acess: Date;
  active: boolean;
}

class UpdateUserService {
  public async execute({
    id,
    full_name,
    cpf,
    date_of_birth,
    plan_type,
    email,
    phone,
    password,
    observation,
    last_acess,
    active,
  }: Request): Promise<User> {
    const currentDate = new Date();
    const usersRepository = getCustomRepository(UsersRepository);

    // const pastExpirationDate = isBefore(
    //   startOfDay(new Date(expiration_date)),
    //   startOfDay(currentDate),
    // );

    // if (pastExpirationDate) {
    //   throw new AppError(
    //     'Não é possível cadastrar um treino com data passada',
    //     400,
    //   );
    // }

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    usersRepository.merge(user, {
      full_name,
      cpf,
      date_of_birth,
      plan_type,
      email,
      phone,
      password,
      observation,
      last_acess,
      active,
    });

    const result = await usersRepository.save(user);
    return result;
  }
}

export default UpdateUserService;
