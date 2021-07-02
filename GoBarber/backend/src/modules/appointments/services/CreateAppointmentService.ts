import { startOfHour } from 'date-fns';

import Appointment from "../infra/typeorm/entities/Appointment";

import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequestDTO {
    provider_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(

       @inject('AppointmentsRepository') 
       private appointmentsRepository: IAppointmentsRepository
    ) {}

    public async execute({date, provider_id}:  IRequestDTO): Promise<Appointment >{
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