import { EntityRepository, Repository } from 'typeorm';
import Exercise from '../models/Exercise';

@EntityRepository(Exercise)
class ExercisesRepository extends Repository<Exercise> {}

export default ExercisesRepository;
