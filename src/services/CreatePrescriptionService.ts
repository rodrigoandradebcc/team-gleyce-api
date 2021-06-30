import { getCustomRepository } from 'typeorm';
import Prescription from '../models/Prescription';
import PrescriptionsRepository from '../repositories/PrescriptionsRepository';

interface Request {
  repetition: string;
  serie: string;
  weight: string;
  interval: string;
  observation: string;
}

class CreatePrescriptionService {
  public async execute({
    repetition,
    serie,
    weight,
    interval,
    observation,
  }: Request): Promise<Prescription> {
    const prescriptionRepository = getCustomRepository(PrescriptionsRepository);

    const newPrescription = prescriptionRepository.create({
      repetition,
      serie,
      weight,
      interval,
      observation,
    });

    const savedPrescription = await prescriptionRepository.save(
      newPrescription,
    );
    return savedPrescription;
  }
}

export default CreatePrescriptionService;
