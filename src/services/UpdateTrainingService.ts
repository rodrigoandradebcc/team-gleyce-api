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
}

class UpdateTrainingService {
  public async execute({
    id,
    expiration_date,
    name,
    note,
    observation,
    user_id,
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

    const trainings = await trainingsRepository.find({ user_id });

    const checkExistTraining = trainings.find(training =>
      isEqual(
        startOfDay(new Date(training.expiration_date)),
        startOfDay(new Date(expiration_date)),
      ),
    );

    if (checkExistTraining) {
      throw new AppError(
        'Não é possível cadastrar um treino com mesma data de expiração',
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
    });

    const result = await trainingsRepository.save(training);
    return result;
  }
}

export default UpdateTrainingService;
