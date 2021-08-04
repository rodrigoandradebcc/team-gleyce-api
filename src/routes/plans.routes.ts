import { Request, Response, Router } from 'express';
import CreatePlanService from '../services/CreatePlanService';
import DeletePlanService from '../services/DeletePlanService';
import GetExercisesAndPrescriptionCompletedToPlanService from '../services/GetExercisesAndPrescriptionCompletedToPlanService';
import GetTrainingCompletedToUserService from '../services/GetTrainingCompletedToUserService';
import InsertExerciseInPlanService from '../services/InsertExerciseInPlanService';
import ListPlansToUserService from '../services/ListPlansToUserService';
import UpdatePlanService from '../services/UpdatePlanService';

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
    return response.status(400).json({ error: err.message });
  }
});

plansRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const { description } = request.body;

    const updatePlan = new UpdatePlanService();

    const newPlan = await updatePlan.execute({ id, description });

    return response.json(newPlan);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

plansRouter.post('/insert-exercise', async (request, response) => {
  try {
    const { plan_id, exercise_id, prescription } = request.body;

    const insertExercise = new InsertExerciseInPlanService();

    const result = await insertExercise.execute({
      plan_id,
      exercise_id,
      prescription,
    });

    return response.json(result);
  } catch (err) {
    console.log(err);
    return response.status(400).json({ error: err.message });
  }
});

plansRouter.get(
  '/plan-completed/:id',
  async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const getExercisesAndPrescriptionCompletedToPlanService =
        new GetExercisesAndPrescriptionCompletedToPlanService();

      const planCompleted =
        await getExercisesAndPrescriptionCompletedToPlanService.execute({
          plan_id: id,
        });

      return response.json(planCompleted);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

plansRouter.get(
  '/training-completed/:id',
  async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const getTrainingCompletedToUserService =
        new GetTrainingCompletedToUserService();

      const trainingCompleted = await getTrainingCompletedToUserService.execute(
        {
          id,
        },
      );

      return response.json(trainingCompleted);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

plansRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deletePlan = new DeletePlanService();

    await deletePlan.execute({ id });

    return response.status(204).send();
  } catch (err) {
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

// plansRouter.get('/:id', async (request: Request, response: Response) => {
//   try {
//     const { id } = request.params;
//     const plansToUser = new ListPlansToUserService();

//     const plans = await plansToUser.execute({ id });

//     return response.json(plans);
//   } catch (err) {
//     return response.status(400).json({ error: err.message });
//   }
// });

export default plansRouter;
