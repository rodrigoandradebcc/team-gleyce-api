import { getCustomRepository } from 'typeorm';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  id: string;
  change_active: boolean;
}

class ChangeActiveUserService {
  public async execute({ id, change_active }: Request): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ where: { id } });

    if (!user) throw new Error('User not found');

    if (user.active && change_active === user.active) {
      throw new Error('Usuário já está com estado ativo');
    } else if (!user.active && change_active === user.active) {
      throw new Error('Usuário já está com estado desativado');
    }

    await usersRepository.update(user.id, { active: change_active });

    const newUser = user;

    return newUser;
  }
}

export default ChangeActiveUserService;
