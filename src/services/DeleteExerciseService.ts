import { getCustomRepository } from 'typeorm';

import ExercisesRepository from '../repositories/ExercisesRepository';

interface Request {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: Request): Promise<void> {
    const exerciseRepository = getCustomRepository(ExercisesRepository);

    const exercise = await exerciseRepository.findOne(id);

    if (!exercise) {
      throw new Error('Exercise does not exist');
    }

    await exerciseRepository.delete(exercise.id);
  }
}

export default DeleteProductService;
