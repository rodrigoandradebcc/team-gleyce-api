import { getCustomRepository, Raw, ILike, Equal, FindOperator } from 'typeorm';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  name: string;
  active?: boolean;
}

class FilterUsersByName {
  public async execute({ name, active }: Request): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = await usersRepository.find({
      where: [
        {
          full_name: ILike(`%${name}%`),
          active
        }
      ]
    });

    if (!users) throw new Error('Users not exists');

    return users;
  }
}

export default FilterUsersByName;
