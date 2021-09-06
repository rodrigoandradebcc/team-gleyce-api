import { getCustomRepository } from 'typeorm';
import PlansExercisesRepository from '../repositories/PlansExercisesRepository';
import Prescription from '../models/Prescription';
import PlansExercises from '../models/PlansExercises';

interface DTO {
  plan_id: string;
}

interface LinkedPlanExercisesProps {
  id: string;
  plan_id: string;
  exercise_id: string;
  prescription_id: string;
  prescription: Prescription;
}

class GetExercisesAndPrescriptionCompletedToPlanService {
  public async execute({ plan_id }: DTO): Promise<any> {
    const plansExercisesRepository = getCustomRepository(
      PlansExercisesRepository,
    );

    const exercisesAndPrescriptionLinkedToThePlan = await plansExercisesRepository.find(
      {
        where: { plan_id },
        order: { ordination_id: 'ASC' },
      },
    );

    return exercisesAndPrescriptionLinkedToThePlan;
  }
}

export default GetExercisesAndPrescriptionCompletedToPlanService;
