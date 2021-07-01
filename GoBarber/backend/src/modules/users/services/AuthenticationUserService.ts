import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestDTO {
    email: string,
    password: string
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
     ) {}
     
    public async execute({ email, password }: IRequestDTO): Promise<{user: User, token: string}> {
        const user = await this.usersRepository.findByEmail( email );

        if(!user) {   
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const { secret , expiresIn } = authConfig.jwt;

        const token = sign(
            { }, 
            secret, 
            { 
                subject: user.id,
                expiresIn
            });


        return({ user, token});
    };
}


export default AuthenticateUserService;