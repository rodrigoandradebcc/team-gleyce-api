import { getCustomRepository } from 'typeorm';
import PlansRepository from '../repositories/PlansRepository';

interface Request {
  id: string;
}

class DeletePlanService {
  public async execute({ id }: Request): Promise<void> {
    const plansRepository = getCustomRepository(PlansRepository);

    const plan = await plansRepository.findOne(id);

    if (!plan) {
      throw new Error('Plano não existe!');
    }

    await plansRepository.delete(plan.id);
  }
}

export default DeletePlanService;
