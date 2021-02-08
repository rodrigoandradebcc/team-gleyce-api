import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ExercisesRepository from '../repositories/ExercisesRepository';
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

exercisesRouter.get('/', async (request, response) => {
  const exercisesRepository = getCustomRepository(ExercisesRepository);
  const exercises = await exercisesRepository.find();

  return response.json(exercises);
});

export default exercisesRouter;
