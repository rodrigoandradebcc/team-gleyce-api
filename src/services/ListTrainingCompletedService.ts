import { getCustomRepository } from 'typeorm';
import Plan from '../models/Plan';
import Exercise from '../models/Exercise';
import Prescription from '../models/Prescription';
import PlansRepository from '../repositories/PlansRepository';
import PlanExercisePrescriptionRepository from '../repositories/PlanExercisePrescriptionRepository';

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
  public async execute({ id }: Request): Promise<any> {
    const plansRepository = getCustomRepository(PlansRepository);
    const plansExercisePrescriptionRepository = getCustomRepository(
      PlanExercisePrescriptionRepository,
    );

    const plans = await plansRepository.find({
      where: { training_id: i },
      order: { created_at: 'ASC' },
    });

    console.log('testea', plans);

    const plansExercisePrescription = await plansExercisePrescriptionRepository.find(
      {
        where: { plan_id: id },
      },
    );

    console.log('teste', plansExercisePrescription);

    let newObject;

    return plans;
  }
}

export default ListTrainingCompletedService;
