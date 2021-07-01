import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from "../infra/typeorm/entities/Appointment";
import AppointmentRepository from "../infra/typeorm/repositories/AppointmentRepository";

import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    constructor(
       private appointmentsRepository: IAppointmentsRepository
    ) {}

    public async execute({date, provider_id}:  IRequestDTO): Promise<Appointment >{
        const appointmentsRepository = getCustomRepository(AppointmentRepository);

        const appointmentDate = startOfHour(date);
    
        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

        if( findAppointmentInSameDate ) {
            throw new AppError('This is appointment is already booked');
            // return res.status(400).json({ message: });
        }

        const appointment = await this.appointmentsRepository.create({provider_id, date});

        return appointment;
    };
}

export default  CreateAppointmentService;