import { getCustomRepository } from 'typeorm';
import Training from '../models/Training';
import TrainingsRepository from '../repositories/TrainingsRepository';

interface Request {
  id: string;
}

class ListTrainingsToUserService {
  public async execute({ id }: Request): Promise<Training[]> {
    const traningsRepository = getCustomRepository(TrainingsRepository);

    const trainings = await traningsRepository.find({ user_id: id });

    if (!trainings) throw new Error('Product not exists');

    return trainings;
  }
}

export default ListTrainingsToUserService;
