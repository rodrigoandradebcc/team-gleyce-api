import { getCustomRepository } from 'typeorm';

import PrescriptionsRepository from '../repositories/PrescriptionsRepository';

interface Prescription {
  repetition?: string;
  serie?: string;
  weight?: string;
  interval?: string;
  observation?: string;
}

interface DTO {
  id: string;
  prescription: Prescription;
}

class UpdatePrescriptionService {
  public async execute({ id, prescription }: DTO): Promise<Prescription> {
    const prescriptionRepository = getCustomRepository(PrescriptionsRepository);

    const prescriptionExist = await prescriptionRepository.findOne(id);

    if (!prescriptionExist) {
      throw new Error('Could not find any prescription with the giver id');
    }

    const updatedPrescription = await prescriptionRepository.save({
      id,
      ...prescription,
    });

    return updatedPrescription;
  }
}

export default UpdatePrescriptionService;
