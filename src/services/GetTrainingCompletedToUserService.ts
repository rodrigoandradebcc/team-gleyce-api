import { getCustomRepository } from 'typeorm';
import Prescription from '../models/Prescription';
import PlansExercisesRepository from '../repositories/PlansExercisesRepository';
import Plan from '../models/Plan';
import PlansRepository from '../repositories/PlansRepository';

interface DTO {
  id: string;
}

interface LinkedPlanExercisesProps {
  id: string;
  plan_id: string;
  exercise_id: string;
  prescription_id: string;
  prescription: Prescription;
}

class GetTrainingCompletedToUserService {
  public async execute({ id }: DTO): Promise<Plan[]> {
    const plansRepository = getCustomRepository(PlansRepository);

    const plans = await plansRepository.find({
      where: { training_id: id },
      order: { created_at: 'ASC' },
      relations: ['plan_exercises'],
    });

    if (!plans) throw new Error('Plans not exists');

    return plans;
  }
}

export default GetTrainingCompletedToUserService;
