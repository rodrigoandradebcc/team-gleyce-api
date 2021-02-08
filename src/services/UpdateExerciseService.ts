import { request, response } from 'express';
import { getCustomRepository } from 'typeorm';
import Exercise from '../models/Exercise';

import ExercisesRepository from '../repositories/ExercisesRepository';

interface Request {
  id: string;
}

class UpdateExerciseService {
  public async execute({ id }: Request): Promise<Exercise> {
    const exerciseRepository = getCustomRepository(ExercisesRepository);

    const exercise = await exerciseRepository.findOne(id);

    if (!exercise) {
      throw new Error('Exercise does not exist');
    }

    await exerciseRepository.merge(exercise, request.body);
    const result = await exerciseRepository.save(exercise);

    return result;
  }
}

export default UpdateExerciseService;
