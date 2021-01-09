import { Router } from 'express';
import CreateExerciseService from '../services/CreateExerciseService';

const exercisesRouter = Router();

exercisesRouter.post('/', async (request, response) => {
  try {
    const { name, exercise_group, link, plan_id } = request.body;

    const createExercise = new CreateExerciseService();

    const exercise = await createExercise.execute({
      name,
      exercise_group,
      link,
      plan_id,
    });

    return response.json(exercise);
  } catch (err) {
    console.log(err);
    return response.status(400).json({ error: err.message });
  }
});

export default exercisesRouter;
