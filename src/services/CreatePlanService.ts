import { getCustomRepository } from 'typeorm';
import Plan from '../models/Plan';
import PlansRepository from '../repositories/PlansRepository';
import AppError from '../shared/AppError';

interface Request {
  description: string;
  training_id: string;
}

class CreatePlanService {
  public async execute({ description, training_id }: Request): Promise<Plan> {
    const plansRepository = getCustomRepository(PlansRepository);

    const planExist = await plansRepository.findOne({
      description,
      training_id,
    });

    if (planExist) {
      throw new AppError(
        'Não é possível adicionar um plano com uma descrição já existente para este aluno',
      );
    }

    if(description === ''){
      throw new AppError(
        'A descrição não pode ser vazia.',
      );
    }

    const plan = plansRepository.create({
      description,
      training_id,
    });

    await plansRepository.save(plan);
    return plan;
  }
}

export default CreatePlanService;
