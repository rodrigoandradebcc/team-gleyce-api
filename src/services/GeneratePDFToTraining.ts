import { getCustomRepository, ILike } from 'typeorm';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  name?: string;
  active?: string;
}

class GeneratePDFToTraining {
  public async execute(): Promise<void> {
    const users = [
      {
        name: 'Rodrigo Andrade',
        age: '22',
      },
      {
        name: 'Rodrigo 2',
        age: '22',
      },
      {
        name: 'Rodrigo 3',
        age: '22',
      },
    ];
  }
}

export default GeneratePDFToTraining;
