import { getCustomRepository, ILike } from 'typeorm';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  name?: string;
  active?: string;
}

class FilterUsersByName {
  public async execute({ name, active }: Request): Promise<User[]> {
    let where;
    if (name === 'undefined' && active) {
      where = {
        active: JSON.parse(active),
      };
    } else if (active && name !== 'undefined') {
      where = {
        full_name: ILike(`%${name}%`),
        active: JSON.parse(active),
      };
    } else {
      where = {
        full_name: ILike(`%${name}%`),
      };
    }

    const usersRepository = getCustomRepository(UsersRepository);
    const users = await usersRepository.find({
      where,
    });

    if (!users) throw new Error('Users not existsa');

    return users;
  }
}

export default FilterUsersByName;
