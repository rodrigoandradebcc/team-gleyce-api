import { Request, Response, Router } from 'express';
import CreatePlanService from '../services/CreatePlanService';
import ListPlansToUserService from '../services/ListPlansToUserService';

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

plansRouter.get('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const plansToUser = new ListPlansToUserService();

    const plans = await plansToUser.execute({ id });

    return response.json(plans);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default plansRouter;
