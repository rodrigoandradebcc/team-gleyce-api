import { getCustomRepository } from 'typeorm';
import Exercise from '../models/Exercise';
import ExercisesRepository from '../repositories/ExercisesRepository';

interface Request {
  name: string;
  exercise_group: string;
  link: string;
  plan_id?: string;
}

class CreateExerciseService {
  public async execute({
    name,
    exercise_group,
    link,
  }: Request): Promise<Exercise> {
    const exercisesRepository = getCustomRepository(ExercisesRepository);

    const exercise = exercisesRepository.create({
      name,
      exercise_group,
      link,
    });

    await exercisesRepository.save(exercise);
    return exercise;
  }
}

export default CreateExerciseService;
