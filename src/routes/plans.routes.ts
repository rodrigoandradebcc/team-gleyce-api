import { Router } from 'express';
import CreatePlanService from '../services/CreatePlanService';

const plansRouter = Router();

plansRouter.post('/', async (request, response) => {
  try {
    const { description, training_id } = request.body;

    const createPlan = new CreatePlanService();

    const plan = await createPlan.execute({
      description,
      training_id,
    });

    return response.json(plan);
  } catch (err) {
    console.log(err);
    return response.status(400).json({ error: err.message });
  }
});

export default plansRouter;
