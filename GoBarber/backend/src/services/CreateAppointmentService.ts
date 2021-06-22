import Appointment from "../models/Appointment";
import AppointmentRepository from "../repositories/AppointmentRepository";
import { startOfHour } from 'date-fns';

interface RequestDTO {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentRepository: AppointmentRepository;

    constructor(appointmentRepository: AppointmentRepository ){
        this.appointmentRepository = appointmentRepository;
    };

    public execute({date, provider}:  RequestDTO): Appointment {
        const appointmentDate = startOfHour(date);
    
        const findAppointmentInSameDate = this.appointmentRepository.findByDate(appointmentDate);

        if( findAppointmentInSameDate ) {
            throw Error('This is appointment is already booked');
            // return res.status(400).json({ message: });
        }

        const appointment = this.appointmentRepository.create({provider, date});
    
        return appointment;
    };
}

export default  CreateAppointmentService;