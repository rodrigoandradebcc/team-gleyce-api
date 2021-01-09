import { Router } from 'express';
import CreatePrescriptionService from '../services/CreatePrescriptionService';

const prescriptionRouter = Router();

prescriptionRouter.post('/', async (request, response) => {
  try {
    const { repetition, serie, weight, interval, observation } = request.body;

    const createPrescription = new CreatePrescriptionService();

    const prescription = await createPrescription.execute({
      repetition,
      serie,
      weight,
      interval,
      observation,
    });

    return response.json(prescription);
  } catch (err) {
    console.log(err);
    return response.status(400).json({ error: err.message });
  }
});

export default prescriptionRouter;
