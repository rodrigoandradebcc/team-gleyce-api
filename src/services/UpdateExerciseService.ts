import { request, response } from 'express';
import { getCustomRepository } from 'typeorm';
import Exercise from '../models/Exercise';

import ExercisesRepository from '../repositories/ExercisesRepository';

interface Request {
  id: string;
  name: string;
  exercise_group: string;
  link: string;
}

class UpdateExerciseService {
  public async execute({
    id,
    name,
    exercise_group,
    link,
  }: Request): Promise<Exercise> {
    const exerciseRepository = getCustomRepository(ExercisesRepository);

    const exercise = await exerciseRepository.findOne(id);

    if (!exercise) {
      throw new Error('Exercise does not exist');
    }

    const newExercise = await exerciseRepository.save({
      id,
      name,
      exercise_group,
      link,
    });

    return newExercise;
  }
}

export default UpdateExerciseService;
