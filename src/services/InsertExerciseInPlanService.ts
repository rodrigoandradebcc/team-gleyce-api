import { getCustomRepository, QueryBuilder } from 'typeorm';
import Plan from '../models/Plan';
import Exercise from '../models/Exercise';
import PlansRepository from '../repositories/PlansRepository';
import PlansExercisesRepository from '../repositories/PlansExercisesRepository';

interface ExerciseProps {
  id: string;
}

interface Request {
  plan_id: string;
  exercisesSelected: ExerciseProps[];
  prescription_id: string;
  training_id: string;
}

class InsertExerciseInPlanService {
  public async execute({
    exercisesSelected,
    prescription_id,
    plan_id,
    training_id,
  }: Request): Promise<any> {
    const plansRepository = getCustomRepository(PlansRepository);

    const plansExercisesRepository = getCustomRepository(
      PlansExercisesRepository,
    );

    const planExist = await plansRepository.findOne(plan_id);

    if (!planExist) {
      throw new Error('Could not find any plan with the giver id');
    }

    const res = plansExercisesRepository.create({
      plan_id,
      exercise_id: exercisesSelected[0].id,
      prescription_id: '89b7d462-a0bd-4f76-9b5e-7e3ea883c911',
    });

    await plansExercisesRepository.save(res);

    // const plan = plansRepository.create({
    //   description: 'B',
    //   training_id,plan_exercises: [exercises: exercisesSelected]
    // });

    // const plans = await plansRepository
    //   .createQueryBuilder()
    //   .insert()
    //   .into('plans_exercises')
    //   .values([
    //     {
    //       plan_id,
    //       prescription_id,
    //       exercise_id,
    //     },
    //   ])
    //   .execute();

    return res;
  }
}

export default InsertExerciseInPlanService;
