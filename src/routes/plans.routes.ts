import { Request, Response, Router } from 'express';
import CreatePlanService from '../services/CreatePlanService';
import InsertExerciseInPlanService from '../services/InsertExerciseInPlanService';
import ListPlansToUserService from '../services/ListPlansToUserService';
import ListTrainingCompletedService from '../services/ListTrainingCompletedService';

const plansRouter = Router();

plansRouter.post('/', async (request, response) => {
  try {
    const { description, training_id } = request.body;

    const createPlan = new CreatePlanService();

    const plan = await createPlan.execute({
      description,
      training_id,
    });

    return response.json(plan);
  } catch (err) {
    console.log(err);
    return response.status(400).json({ error: err.message });
  }
});

plansRouter.post('/insert-exercise', async (request, response) => {
  try {
    const {
      exercisesSelected,
      prescription_id,
      plan_id,
      training_id,
    } = request.body;

    const insertExercise = new InsertExerciseInPlanService();

    const result = await insertExercise.execute({
      exercisesSelected,
      prescription_id,
      plan_id,
      training_id,
    });

    return response.json(result);
  } catch (err) {
    console.log(err);
    return response.status(400).json({ error: err.message });
  }
});

plansRouter.get('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const plansToUser = new ListPlansToUserService();

    const plans = await plansToUser.execute({ id });

    return response.json(plans);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

plansRouter.get(
  '/training-completed/:id',
  async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const trainingCompleted = new ListTrainingCompletedService();

      const plans = await trainingCompleted.execute({ id });

      return response.json(plans);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

export default plansRouter;
