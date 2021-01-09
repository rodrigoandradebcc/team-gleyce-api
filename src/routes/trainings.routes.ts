import { Router } from 'express';
import CreateTrainingService from '../services/CreateTrainingService';

const trainingsRouter = Router();

trainingsRouter.post('/', async (request, response) => {
  try {
    const { name, observation, note, expiration_date, user_id } = request.body;

    const createTraining = new CreateTrainingService();

    const training = await createTraining.execute({
      name,
      observation,
      note,
      expiration_date,
      user_id,
    });

    return response.json(training);
  } catch (err) {
    // console.log(err);
    return response.status(400).json({ error: err.message });
  }
});

export default trainingsRouter;
