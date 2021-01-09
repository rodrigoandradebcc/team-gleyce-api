import { EntityRepository, Repository } from 'typeorm';
import Training from '../models/Training';

@EntityRepository(Training)
class TrainingsRepository extends Repository<Training> {}

export default TrainingsRepository;
