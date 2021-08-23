import { isBefore, isEqual, startOfDay } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Training from '../models/Training';
import TrainingsRepository from '../repositories/TrainingsRepository';
import AppError from '../shared/AppError';

interface Request {
  id: string;
  name: string;
  observation: string;
  note: string;
  expiration_date: Date;
  user_id: string;
  training_frequency: string;
}

class UpdateTrainingService {
  public async execute({
    id,
    expiration_date,
    name,
    note,
    observation,
    user_id,
    training_frequency,
  }: Request): Promise<Training> {
    const currentDate = new Date();
    const trainingsRepository = getCustomRepository(TrainingsRepository);

    const pastExpirationDate = isBefore(
      startOfDay(new Date(expiration_date)),
      startOfDay(currentDate),
    );

    if (pastExpirationDate) {
      throw new AppError(
        'Não é possível cadastrar um treino com data passada',
        400,
      );
    }

    const training = await trainingsRepository.findOne(id);

    if (!training) {
      throw new AppError('Training does not exist');
    }

    trainingsRepository.merge(training, {
      name,
      expiration_date,
      note,
      observation,
      user_id,
      training_frequency
    });

    const result = await trainingsRepository.save(training);
    return result;
  }
}

export default UpdateTrainingService;
