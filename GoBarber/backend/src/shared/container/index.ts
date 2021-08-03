import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

//registerSingleton cria uma única instancia da classe AppointmentRepository para nossa aplicacao inteira
container.registerSingleton<IAppointmentsRepository>(
    'AppointmenstRepository', 
    AppointmentRepository
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository', 
    UserRepository
);

container.registerSingleton<IUserTokensRepository>(
    'UserTokensRepository', 
    UserTokensRepository
);