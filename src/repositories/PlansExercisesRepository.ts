import { EntityRepository, Repository } from 'typeorm';
import PlansExercises from '../models/PlansExercises';

@EntityRepository(PlansExercises)
class PlansExercisesRepository extends Repository<PlansExercises> {}

export default PlansExercisesRepository;
