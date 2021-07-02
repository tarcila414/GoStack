import AppError from "@shared/errors/AppError";

import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import CreateAppointmentService from "./CreateAppointmentService";

describe( 'CreateAppointment', () => {
    it('should be able to create a new appointment', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(
          fakeAppointmentsRepository,
        );
    
        const appointmentDate = new Date(2021,3,23,12);

        await createAppointment.execute({
          date: appointmentDate,
          provider_id: '123123',
        });

        expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: '123123',
            })
        ).rejects.toBeInstanceOf(AppError);
      });
})

// describe( 'CreateAppointment', () => {
//     it('shouldn\'t be able to create a two appointments on the same date', () => {
//         expect().toBe()
//     })
// })