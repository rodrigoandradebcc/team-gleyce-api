import { getCustomRepository, Raw, ILike } from 'typeorm';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  like: string;
}

class FilterUsersByName {
  public async execute({ like }: Request): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = await usersRepository.find({
      full_name: ILike(`%${like}%`),
    });

    if (!users) throw new Error('Users not exists');

    return users;
  }
}

export default FilterUsersByName;
