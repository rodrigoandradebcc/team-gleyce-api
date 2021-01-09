import { getCustomRepository } from 'typeorm';
import Plan from '../models/Plan';
import PlansRepository from '../repositories/PlansRepository';

interface Request {
  description: string;
  training_id: string;
}

class CreatePlanService {
  public async execute({ description, training_id }: Request): Promise<Plan> {
    const plansRepository = getCustomRepository(PlansRepository);

    const plan = plansRepository.create({
      description,
      training_id,
    });

    await plansRepository.save(plan);
    return plan;
  }
}

export default CreatePlanService;
