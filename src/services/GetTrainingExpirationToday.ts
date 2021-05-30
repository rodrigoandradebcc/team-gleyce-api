import { endOfDay, startOfDay } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import TrainingsRepository from '../repositories/TrainingsRepository';

interface Response {
  trainingExpiredToday: string;
}

class GetTrainingExpirationToday {
  public async execute(): Promise<Response> {
    const currentDate = new Date();
    const trainingsRepository = getCustomRepository(TrainingsRepository);

    const trainings = await trainingsRepository
      .createQueryBuilder()
      .select('count(distinct(training.user))::integer', 'trainingExpiredToday')
      .from(subQuery => {
        return subQuery
          .select([
            'max(training.expiration_date) as date',
            'training.user_id as user',
          ])
          .from('trainings', 'training')
          .groupBy('training.user_id');
      }, 'training')
      .where('training.date between :start_date and :end_date', {
        start_date: startOfDay(currentDate),
        end_date: endOfDay(currentDate),
      })
      .getRawOne();

    // const trainings = await trainingsRepository
    //   .createQueryBuilder('training')
    //   .select('max(training.expiration_date)', 'date')
    //   .groupBy('training.user_id')
    //   .getRawMany();

    // const expiredTodayTraining = trainings.reduce((total, training) => {
    //   return training.date >= startOfDay(currentDate) &&
    //     training.date <= endOfDay(currentDate)
    //     ? total + 1
    //     : total;
    // }, 0);

    return trainings;
  }
}

export default GetTrainingExpirationToday;
