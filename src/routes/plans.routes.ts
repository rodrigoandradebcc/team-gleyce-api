import { Request, Response, Router } from 'express';
import CreatePlanService from '../services/CreatePlanService';
import DeleteExerciseAndPrescriptionService from '../services/DeleteExerciseAndPrescriptionService';
import DeletePlanService from '../services/DeletePlanService';
import GetExercisesAndPrescriptionCompletedToPlanService from '../services/GetExercisesAndPrescriptionCompletedToPlanService';
import GetTrainingCompletedToUserService from '../services/GetTrainingCompletedToUserService';
import GetTrainingService from '../services/GetTrainingService';
import InsertExerciseInPlanService from '../services/InsertExerciseInPlanService';
import ListPlansToUserService from '../services/ListPlansToUserService';
import UpdatePlanService from '../services/UpdatePlanService';

const plansRouter = Router();

const ejs = require('ejs');
const path = require('path');
// const pdf = require('html-pdf');
// const puppeteer = require('puppeteer');

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
  '/generate-pdf/:id',
  async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const filePath = path.join(__dirname, '..', 'print.ejs');

      const getTrainingCompletedToUserService =
        new GetTrainingCompletedToUserService();

      const getTrainingService = new GetTrainingService();

      const trainingCompleted = await getTrainingCompletedToUserService.execute(
        {
          id,
        },
      );

      const training = await getTrainingService.execute({
        id: trainingCompleted[0].training_id,
      });

      ejs.renderFile(
        filePath,
        { training, trainingCompleted },
        function (err: Error, str: HTMLDocument) {
          if (err) {
            // return response.send('Erro ao gerar o PDF');
            return response.json({ message: err });
          }
          return response.send(str);
        },
      );
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

      const getTrainingService = new GetTrainingService();

      const trainingCompleted = await getTrainingCompletedToUserService.execute(
        {
          id,
        },
      );

      const training = await getTrainingService.execute({
        id: trainingCompleted[0].training_id,
      });

      return response.json({ training, trainingCompleted });
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

plansRouter.delete('/delete-exercise/:id', async (request, response) => {
  try {
    const { plan_id } = request.body;
    const { id } = request.params;

    const deleteExercise = new DeleteExerciseAndPrescriptionService();
    await deleteExercise.execute({plan_id, exercise_id: id});

    return response.status(204).send();
  } catch (error) {
    return response.status(400).json({ error: error.message });
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
