import { getCustomRepository } from 'typeorm';
import PlanExercisePrescription from '../models/PlanExercisePrescription';
import PlanExercisePrescriptionRepository from '../repositories/PlanExercisePrescriptionRepository';

interface Request {
  plan_id: string;
  exercise_id: string;
  prescription_id: string;
}

class CreateExerciseService {
  public async execute({
    plan_id,
    exercise_id,
    prescription_id,
  }: Request): Promise<PlanExercisePrescription> {
    const planExercisePrescriptionRepository = getCustomRepository(
      PlanExercisePrescriptionRepository,
    );

    const setupExercise = planExercisePrescriptionRepository.create({
      plan_id,
      exercise_id,
      prescription_id,
    });

    await planExercisePrescriptionRepository.save(setupExercise);
    return setupExercise;
  }
}

export default CreateExerciseService;
