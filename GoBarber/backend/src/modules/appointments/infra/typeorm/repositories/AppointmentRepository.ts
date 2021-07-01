import { getRepository, Repository } from "typeorm";

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import Appointment from "../entities/Appointment";
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";


class AppointmentRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>;
    
    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({ provider_id, date });

        await this.ormRepository.save(appointment);

        return appointment;
    }

    public async findByDate(date: Date): Promise<Appointment | null>{
        // const findAppointment = this.appointments.find( appointment => isEqual(date, appointment.date));

        const findAppointment = await this.ormRepository.findOne({
            where: { date },
        })
        return findAppointment || null;
    }

}


export default AppointmentRepository;