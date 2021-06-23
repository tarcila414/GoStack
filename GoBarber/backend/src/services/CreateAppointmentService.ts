import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from "../models/Appointment";
import AppointmentRepository from "../repositories/AppointmentRepository";


interface RequestDTO {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({date, provider_id}:  RequestDTO): Promise<Appointment >{
        const appointmentsRepository = getCustomRepository(AppointmentRepository);

        const appointmentDate = startOfHour(date);
    
        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

        if( findAppointmentInSameDate ) {
            throw Error('This is appointment is already booked');
            // return res.status(400).json({ message: });
        }

        const appointment = appointmentsRepository.create({provider_id, date});
    
        await appointmentsRepository.save(appointment);

        return appointment;
    };
}

export default  CreateAppointmentService;