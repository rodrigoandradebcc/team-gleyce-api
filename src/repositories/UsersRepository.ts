import User from '../models/User';

class UsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public create(
    full_name: string,
    cpf: string,
    date_of_birth: Date,
    plan_type: string,
    email: string,
    phone: string,
    password: string,
    note: string,
    last_acess: Date,
  ): User {
    const user = new User(
      full_name,
      cpf,
      date_of_birth,
      plan_type,
      email,
      phone,
      password,
      note,
      last_acess,
    );

    this.users.push(user);
    return user;
  }
}

export default UsersRepository;
