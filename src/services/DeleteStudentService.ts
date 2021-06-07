import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  id: string;
}

class DeleteStudentService {
  public async execute({ id }: Request): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new Error('Usuário não existe!');
    }

    await usersRepository.delete(user.id);
  }
}

export default DeleteStudentService;
