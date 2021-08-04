import { getCustomRepository } from 'typeorm';
import Plan from '../models/Plan';
import PlansRepository from '../repositories/PlansRepository';
import AppError from '../shared/AppError';

interface Request {
  id: string;
  description: string;
}

class UpdatePlanService {
  public async execute({ id, description }: Request): Promise<Plan> {
    const plansRepository = getCustomRepository(PlansRepository);

    console.log('aaaaaaaaaaaaaaaa');

    const plan = await plansRepository.findOne(id);

    if (!plan) {
      throw new AppError('Plan does not exist');
    }

    plansRepository.merge(plan, {
      description,
    });

    const result = await plansRepository.save(plan);
    return result;
  }
}

export default UpdatePlanService;
