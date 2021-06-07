import { getCustomRepository } from 'typeorm';
import TrainingsRepository from '../repositories/TrainingsRepository';

interface Request {
  id: string;
}

class DeleteTrainingService {
  public async execute({ id }: Request): Promise<void> {
    const trainingsRepository = getCustomRepository(TrainingsRepository);

    const training = await trainingsRepository.findOne(id);

    if (!training) {
      throw new Error('Treino não existe!');
    }

    await trainingsRepository.delete(training.id);
  }
}

export default DeleteTrainingService;
