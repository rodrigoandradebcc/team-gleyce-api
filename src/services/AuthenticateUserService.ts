import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

interface RequestProps {
  email: string;
  password: string;
}

interface ResponseProps {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: RequestProps): Promise<ResponseProps> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    console.log('usuário de dentro', user);

    if (!user) throw new Error('Incorrect email or password combination');

    console.log('senha1', password);
    console.log('senha2', user.password);

    const passwordMatched = await compare(password, user.password);

    console.log('resposta', passwordMatched);

    if (!passwordMatched)
      throw new Error('Incorrect email or password combination');

    const token = sign({}, '7d27bb8b29f0232f0dc5d7bbeab55b81', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
