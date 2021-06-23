import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';


const appointmentsRouter = Router();

appointmentsRouter.get('/', async (req, res) => {
    const appointmentsRepository = getCustomRepository(AppointmentRepository)

    const appointments = await appointmentsRepository.find();

    return res.json(appointments);
})

appointmentsRouter.post('/', async (req, res) => {
    try {    
        const { provider_id, date } = req.body;

        const parsedDate = parseISO(date);
    
        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({ date: parsedDate , provider_id});

        return res.json(appointment);
    } catch ( err: any ) {
        return res.status(400).json({ error: err.message})
    }
});



export default appointmentsRouter;