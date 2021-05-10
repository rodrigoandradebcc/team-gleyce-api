import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import CreateExerciseToPlain from '../services/CreateExerciseToPlain';
import PlansRepository from '../repositories/PlansRepository';
import ExercisesRepository from '../repositories/ExercisesRepository';
import PlanExercisePrescriptionRepository from '../repositories/PlanExercisePrescriptionRepository';

const setupPlanRouter = Router();

setupPlanRouter.post('/', async (request, response) => {
  try {
    const { plan_id, exercise_id, prescription_id } = request.body;

    const createPlan = new CreateExerciseToPlain();

    const plan = await createPlan.execute({
      plan_id,
      exercise_id,
      prescription_id,
    });

    return response.json(plan);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

setupPlanRouter.get('/', async (request, response) => {
  const plansRepository = getCustomRepository(PlansRepository);
  const plans = await plansRepository.find({
    relations: ['exercicios'],
  });

  return response.json(plans);
});

export default setupPlanRouter;
