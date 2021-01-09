import { EntityRepository, Repository } from 'typeorm';
import Prescription from '../models/Prescription';

@EntityRepository(Prescription)
class PrescriptionsRepository extends Repository<Prescription> {}

export default PrescriptionsRepository;
