import { isBefore, isEqual, startOfDay } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import TrainingsRepository from '../repositories/TrainingsRepository';
import AppError from '../shared/AppError';

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
  }: Request): Promise<Request> {
    const trainingsRepository = getCustomRepository(TrainingsRepository);
    const currentDate = new Date();

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
