import { getCustomRepository } from 'typeorm';
import Plan from '../models/Plan';
import PlansRepository from '../repositories/PlansRepository';

interface Request {
  id: string;
}

class ListPlansToUserService {
  public async execute({ id }: Request): Promise<Plan[]> {
    const plansRepository = getCustomRepository(PlansRepository);

    const plans = await plansRepository.find({
      where: { training_id: id },
      order: { created_at: 'ASC' },
    });

    if (!plans) throw new Error('Plans not exists');

    return plans;
  }
}

export default ListPlansToUserService;
