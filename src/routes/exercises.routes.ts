import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import ExercisesRepository from '../repositories/ExercisesRepository';
import Exercise from '../models/Exercise';

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
  const exercisesRepository = getRepository(Exercise);
  const { limit=10, page=0 } = request.query;

  const offset = Number(page) * Number(limit)

  const [exercises, exerciseCount] = await exercisesRepository
    .createQueryBuilder()
    .take(Number(limit))
    .skip(offset)
    .orderBy('name','ASC')
    .getManyAndCount();

  return response.json({total: exerciseCount, exercises});
});

exercisesRouter.get('/all', async (request, response) => {
  const exercisesRepository = getCustomRepository(ExercisesRepository);
  const exercises = await exercisesRepository.find();

  return response.json(exercises);
});


exercisesRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const exercisesRepository = getCustomRepository(ExercisesRepository);
  const exercises = await exercisesRepository.findOne({ id });

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
    const { name, exercise_group, link } = request.body;

    const updateExercise = new UpdateExerciseService();

    const res = await updateExercise.execute({
      id,
      name,
      exercise_group,
      link,
    });
    return response.status(200).json(res);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default exercisesRouter;
