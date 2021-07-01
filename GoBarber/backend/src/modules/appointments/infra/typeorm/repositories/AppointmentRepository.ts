import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import { EntityRepository, Repository } from "typeorm";

import Appointment from "../entities/Appointment";

@EntityRepository(Appointment)
class AppointmentRepository  extends Repository<Appointment> implements IAppointmentsRepository {
    public async findByDate(date: Date): Promise<Appointment | null>{
        // const findAppointment = this.appointments.find( appointment => isEqual(date, appointment.date));

        const findAppointment = await this.findOne({
            where: { date },
        })
        return findAppointment || null;
    }

}


export default AppointmentRepository;