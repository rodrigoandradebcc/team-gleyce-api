import { getCustomRepository } from 'typeorm';
import { getDaysInMonth, getDate, isAfter, format } from 'date-fns';
// import pt from 'date-fns/locales/pt';
import Training from '../models/Training';
import TrainingsRepository from '../repositories/TrainingsRepository';

interface Request {
  id: string;
  tab?: string;
}

class ListTrainingsToUserService {
  public async execute({ id, tab }: Request): Promise<Training[]> {
    const trainingsRepository = getCustomRepository(TrainingsRepository);

    const trainings = await trainingsRepository.find({ user_id: id });
    const currentDate = new Date(Date.now());

    if (tab === 'active') {
      const activeTrainings = trainings.filter(training =>
        isAfter(training.expiration_date, currentDate),
      );

      return activeTrainings;
    }

    if (tab === 'disabled') {
      const disabledTrainings = trainings.filter(
        training => !isAfter(training.expiration_date, currentDate),
      );
      return disabledTrainings;
    }

    // const formattedDate = format(
    //   currentDate,
    //   "'Dia' dd 'de' MMMM', às ' HH:mm'h'",
    // );

    if (!trainings) throw new Error('Trainings not exists');

    return trainings;
  }
}

export default ListTrainingsToUserService;
