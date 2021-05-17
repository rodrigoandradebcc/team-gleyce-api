import { getCustomRepository, QueryBuilder } from 'typeorm';
import Plan from '../models/Plan';
import PlansRepository from '../repositories/PlansRepository';

interface Request {
  plan_id: string;
  exercise_id: string;
  prescription_id: string;
  training_id: string;
}

class InsertExerciseInPlanService {
  public async execute({
    exercise_id,
    prescription_id,
    plan_id,
    training_id,
  }: Request): Promise<any> {
    const plansRepository = getCustomRepository(PlansRepository);

    const plan = await plansRepository.findOne(training_id);

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

    return plan;
  }
}

export default InsertExerciseInPlanService;
