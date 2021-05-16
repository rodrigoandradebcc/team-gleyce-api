import { getCustomRepository } from 'typeorm';
import Plan from '../models/Plan';
import Exercise from '../models/Exercise';
import Prescription from '../models/Prescription';
import PlansRepository from '../repositories/PlansRepository';

interface Request {
  id: string;
}

interface ExerciseObject extends Exercise {
  prescription: Prescription;
}

interface TrainingCompleted {
  plan: Plan;
  exercises: ExerciseObject[];
}

class ListTrainingCompletedService {
  public async execute({ id }: Request): Promise<Plan[]> {
    const plansRepository = getCustomRepository(PlansRepository);

    const plans = await plansRepository.find({
      where: { training_id: id },
      order: { created_at: 'ASC' },
      relations: ['exercises'],
    });

    console.log('testea', plans);

    return plans;
  }
}

export default ListTrainingCompletedService;
