import { EntityRepository, Repository } from 'typeorm';
import PlanExercisePrescription from '../models/PlanExercisePrescription';

@EntityRepository(PlanExercisePrescription)
class PlanExercisePrescriptionRepository extends Repository<PlanExercisePrescription> {}

export default PlanExercisePrescriptionRepository;
