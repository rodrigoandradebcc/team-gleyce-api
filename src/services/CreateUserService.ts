import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { classToClass } from 'class-transformer';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';
import AppError from '../shared/AppError';

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
  active: boolean;
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
    active,
  }: Request): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const userEmailExist = await usersRepository.findOne({ email });

    if (userEmailExist) {
      throw new AppError('Email address already used.');
    }

    const passwordHashed = await hash(password, 8);

    const user = usersRepository.create({
      full_name,
      cpf,
      date_of_birth,
      plan_type,
      email,
      phone,
      password: passwordHashed,
      observation,
      last_acess,
      active,
    });

    await usersRepository.save(user);

    return classToClass(user);
    // return user;
  }
}

export default CreateUserService;
