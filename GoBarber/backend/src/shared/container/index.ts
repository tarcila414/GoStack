import { container } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

//registerSingleton cria uma única instancia da classe AppointmentRepository para nossa aplicacao inteira
container.registerSingleton<IAppointmentsRepository>(
    'AppointmenstRepository', 
    AppointmentRepository
);



container.registerSingleton<IUsersRepository>(
    'UsersRepository', 
    UserRepository
);