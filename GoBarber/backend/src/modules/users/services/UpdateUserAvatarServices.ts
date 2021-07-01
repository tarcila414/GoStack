import path from 'path';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities//User';
import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestDTO {
    user_id: string,
    avatarFilename: string
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
     ) {}

    public async execute({ user_id, avatarFilename}: IRequestDTO): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if(!user) {
            throw new AppError('Only authenticated users can change the avatar', 401);
        }

        if(user.avatar) {
            const userAvatarFilePath = path.join( uploadConfig.directory, user.avatar);
            const userAvatarExists = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarExists) {
                await fs.promises.unlink(userAvatarFilePath); // delete the file in our directory
            }
        }

        user.avatar = avatarFilename;

        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;