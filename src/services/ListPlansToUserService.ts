import { getCustomRepository } from 'typeorm';
import Plan from '../models/Plan';
import PlansRepository from '../repositories/PlansRepository';

interface Request {
  id: string;
}

class ListPlansToUserService {
  public async execute({ id }: Request): Promise<Plan[]> {
    const plansRepository = getCustomRepository(PlansRepository);

    const plans = await plansRepository.find({ training_id: id });

    if (!plans) throw new Error('Product not exists');

    return plans;
  }
}

export default ListPlansToUserService;
