import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { date, user_id } = request.body;

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date,
      user_id,
    });

    return response.json(appointment);
  } catch (error) {
    console.log(error);
    return response.status(400).json({ error: error.message });
  }
});

export default appointmentsRouter;
