import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

import CreateUserService from '../../../services/CreateUserService';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarServices';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthentication';
import uploadConfig from '@config/upload';


const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
    
    const { name, email, password } = req.body;
    
    const createUser = container.resolve(CreateUserService);
    
    const user  = await createUser.execute({
        name, 
        email,
        password
    }); 

    user.password = "";

    res.json(user);

});

usersRouter.patch(
    '/avatar', 
    ensureAuthenticated, 
    upload.single('avatar'), 
    async ( req, res) => {
        
        const updateUserAvatar = container.resolve( UpdateUserAvatarService);

        const user = await updateUserAvatar.execute({
            user_id: req.user.id,
            avatarFilename: req.file?.filename || ""
        });

        user.password = "";
        
        return res.json(user);        
    }
);


export default usersRouter;