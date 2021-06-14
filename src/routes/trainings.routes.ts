import { Request, Response, Router } from 'express';
import { getCustomRepository } from 'typeorm';
import TrainingsRepository from '../repositories/TrainingsRepository';
import CreateTrainingService from '../services/CreateTrainingService';
import DeleteTrainingService from '../services/DeleteTrainingService';
import GetTrainingExpirationToday from '../services/GetTrainingExpirationToday';
import ListTrainingsToUserService from '../services/ListTrainingsToUserService';
import UpdateTrainingService from '../services/UpdateTrainingService';

const trainingsRouter = Router();

trainingsRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { name, observation, note, expiration_date, user_id } = request.body;

    const updateProduct = new UpdateTrainingService();

    const newTraining = await updateProduct.execute({
      id,
      name,
      observation,
      note,
      expiration_date,
      user_id,
    });

    return response.json(newTraining);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

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
    return response.status(400).json({ error: err.message });
  }
});

trainingsRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deleteTraining = new DeleteTrainingService();

    await deleteTraining.execute({ id });

    return response.status(204).send();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

trainingsRouter.get('/', async (request, response) => {
  const trainingRepository = getCustomRepository(TrainingsRepository);
  const plans = await trainingRepository.find({
    where: { user_id: 'd7c63720-4dd5-4c87-ac07-f20d23eda913' },
    relations: ['plan'],
  });

  return response.json(plans);
});

trainingsRouter.get(
  '/total-trainings-expiration',
  async (request: Request, response: Response) => {
    try {
      const trainingExpirationToday = new GetTrainingExpirationToday();

      const totalTrainingsExpirationToday =
        await trainingExpirationToday.execute();

      return response.json(totalTrainingsExpirationToday);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

trainingsRouter.get('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const { tab } = request.query;

    const trainingsToUser = new ListTrainingsToUserService();

    const trainings = await trainingsToUser.execute({ id, tab: String(tab) });

    return response.json(trainings);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default trainingsRouter;
