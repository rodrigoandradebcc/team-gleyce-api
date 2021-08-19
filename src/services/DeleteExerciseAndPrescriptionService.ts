import { getCustomRepository } from "typeorm";
import PlansExercisesRepository from "../repositories/PlansExercisesRepository";
import PlansRepository from "../repositories/PlansRepository";
import PrescriptionsRepository from "../repositories/PrescriptionsRepository";

interface Request {
  plan_id: string;
  exercise_id: string;
}

class DeleteExerciseAndPrescriptionService {
  public async execute({exercise_id, plan_id}:Request) {
    console.log('exercise_id',exercise_id,plan_id)
    const plansExercisesRepository = getCustomRepository(PlansExercisesRepository);
    const prescriptionRepository = getCustomRepository(PrescriptionsRepository);


    const exercise = await plansExercisesRepository.findOne({where: {exercise_id,plan_id}});

    if (!exercise) {
      throw new Error('Exercise does not exist');
    }

    await plansExercisesRepository.delete(exercise.id);
    await prescriptionRepository.delete(exercise.prescription_id);

  }
}

export default DeleteExerciseAndPrescriptionService;

