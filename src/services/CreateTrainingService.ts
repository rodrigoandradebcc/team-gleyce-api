import { getCustomRepository } from 'typeorm';
import Training from '../models/Training';
import TrainingsRepository from '../repositories/TrainingsRepository';

interface Request {
  name: string;
  observation: string;
  note: string;
  expiration_date: Date;
  user_id: string;
}

class CreateTrainingService {
  public async execute({
    name,
    observation,
    note,
    expiration_date,
    user_id,
  }: Request): Promise<Training> {
    const trainingsRepository = getCustomRepository(TrainingsRepository);

    const training = trainingsRepository.create({
      name,
      observation,
      note,
      expiration_date,
      user_id,
    });

    await trainingsRepository.save(training);
    return training;
  }
}

export default CreateTrainingService;
