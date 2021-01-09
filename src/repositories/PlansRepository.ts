import { EntityRepository, Repository } from 'typeorm';
import Plan from '../models/Plan';

@EntityRepository(Plan)
class PlansRepository extends Repository<Plan> {}

export default PlansRepository;
