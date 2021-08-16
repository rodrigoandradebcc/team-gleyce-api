import { getCustomRepository } from 'typeorm';
import { getDaysInMonth, getDate, isAfter, format } from 'date-fns';
// import pt from 'date-fns/locales/pt';
import Training from '../models/Training';
import TrainingsRepository from '../repositories/TrainingsRepository';

interface Request {
  id: string;
}

class GetTrainingService {
  public async execute({ id }: Request): Promise<Training> {
    const trainingsRepository = getCustomRepository(TrainingsRepository);

    const training = await trainingsRepository.findOne({
      where: { id },
    });

    if (!training) throw new Error('Training not found');

    return training;
  }
}

export default GetTrainingService;
