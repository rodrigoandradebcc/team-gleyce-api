import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  id: string;
  active: boolean;
}

class ChangeActiveUserService {
  public async execute({ id, active }: Request): Promise<boolean> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ where: { id } });

    if (!user) throw new Error('User not found');

    if (user.active && active === user.active) {
      throw new Error('Usuário já está com estado ativo');
    } else if (!user.active && active === user.active) {
      throw new Error('Usuário já está com estado desativado');
    }

    await usersRepository.update(user.id, { active });

    return active;
  }
}

export default ChangeActiveUserService;
