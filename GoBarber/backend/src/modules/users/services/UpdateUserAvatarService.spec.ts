import AppError from "@shared/errors/AppError";

import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";

import UpdateUserAvatarService from './UpdateUserAvatarService';

describe( 'UpdateUser', () => {
    it('should be able to update a user avatar', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const updateUserAvatar = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider
        );
        
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })
  
        await updateUserAvatar.execute({
           user_id: user.id,
           avatarFilename: 'avatar.jpg'
        });

        expect(user.avatar).toBe('avatar.jpg');
    });

    it('shouldn\'t be able to update avatar from a non existing user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const updateUserAvatar = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider
        );
  

        expect(
            updateUserAvatar.execute({
                user_id: 'non-existing-user',
                avatarFilename: 'avatar.jpg'
             })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should delete old avatar when updating a new one', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const updateUserAvatar = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider
        );
        
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })
  
        await updateUserAvatar.execute({
           user_id: user.id,
           avatarFilename: 'avatar.jpg'
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar2.jpg'
        });

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
        expect(user.avatar).toBe('avatar2.jpg');
    });
})
