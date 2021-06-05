import { getCustomRepository } from 'typeorm';
import Training from '../models/Training';
import TrainingsRepository from '../repositories/TrainingsRepository';

interface Request {
  id: string;
}

class DeleteTrainingService {
  public async execute({ id }: Request): Promise<void> {
    const trainingsRepository = getCustomRepository(TrainingsRepository);

    const training = await trainingsRepository.findOne(id);

    if (!training) {
      throw new Error('Training does not exist');
    }

    await trainingsRepository.delete(training.id);
  }
}

export default DeleteTrainingService;
