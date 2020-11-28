import { uuid } from 'uuidv4';

class User {
  id: string;

  full_name: string;

  cpf: string;

  date_of_birth: Date;

  plan_type: string;

  email: string;

  phone: string;

  password: string;

  note: string;

  last_acess: Date;

  constructor(
    full_name: string,
    cpf: string,
    date_of_birth: Date,
    plan_type: string,
    email: string,
    phone: string,
    password: string,
    note: string,
    last_acess: Date,
  ) {
    this.id = uuid();
    this.full_name = full_name;
    this.cpf = cpf;
    this.date_of_birth = date_of_birth;
    this.plan_type = plan_type;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.note = note;
    this.last_acess = last_acess;
  }
}
export default User;
