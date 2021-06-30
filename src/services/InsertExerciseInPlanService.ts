import { getCustomRepository } from 'typeorm';
import PlansExercisesRepository from '../repositories/PlansExercisesRepository';
import PlansRepository from '../repositories/PlansRepository';
import CreatePrescriptionService from './CreatePrescriptionService';
import UpdatePrescriptionService from './UpdatePrescriptionService';

interface ExerciseProps {
  id: string;
}

interface PrescriptionProps {
  repetition: string;
  serie: string;
  weight: string;
  interval: string;
  observation: string;
}

interface Request {
  plan_id: string;
  exercise_id: string;
  prescription: PrescriptionProps;
  // training_id: string;
}

class InsertExerciseInPlanService {
  public async execute({
    exercise_id,
    prescription,
    plan_id,
  }: Request): Promise<any> {
    const plansRepository = getCustomRepository(PlansRepository);
    const prescriptionService = new CreatePrescriptionService();
    const updatePrescriptionService = new UpdatePrescriptionService();

    const plansExercisesRepository = getCustomRepository(
      PlansExercisesRepository,
    );

    const planExist = await plansRepository.findOne(plan_id);

    if (!planExist) {
      throw new Error('Could not find any plan with the giver id');
    }

    const prescriptionExist = await plansExercisesRepository.findOne({
      plan_id,
      exercise_id,
    });

    if (prescriptionExist) {
      const { prescription_id } = prescriptionExist;

      const updatedPrescription = await updatePrescriptionService.execute({
        id: prescription_id,
        prescription,
      });

      return updatedPrescription;
    }

    const newPrescription = await prescriptionService.execute({
      ...prescription,
    });

    const res = plansExercisesRepository.create({
      plan_id,
      exercise_id,
      prescription_id: newPrescription.id,
    });

    await plansExercisesRepository.save(res);

    return res;
  }
}

export default InsertExerciseInPlanService;
