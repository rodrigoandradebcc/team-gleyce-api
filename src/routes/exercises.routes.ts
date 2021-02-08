import { request, response, Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ExercisesRepository from '../repositories/ExercisesRepository';
import CreateExerciseService from '../services/CreateExerciseService';
import DeleteExerciseService from '../services/DeleteExerciseService';
import UpdateExerciseService from '../services/UpdateExerciseService';

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

exercisesRouter.get('/', async (request, response) => {
  const exercisesRepository = getCustomRepository(ExercisesRepository);
  const exercises = await exercisesRepository.find();

  return response.json(exercises);
});

exercisesRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deleteExercise = new DeleteExerciseService();

    await deleteExercise.execute({ id });

    return response.status(204).send();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

exercisesRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const updateExercise = new UpdateExerciseService();

    await updateExercise.execute({ id });
    return response.status(204).send();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default exercisesRouter;
