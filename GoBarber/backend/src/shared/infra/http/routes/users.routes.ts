import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../../../../modules/users/services/CreateUserService';
import UpdateUserAvatarService from '../../../../modules/users/services/UpdateUserAvatarServices';

import ensureAuthenticated from '../middlewares/ensureAuthentication';
import uploadConfig from '../../../../config/upload';


const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {

    const { name, email, password } = req.body;
    
    const createUser = new CreateUserService();
    
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
        const updateUserAvatar = new UpdateUserAvatarService();

        const user = await updateUserAvatar.execute({
            user_id: req.user.id,
            avatarFilename: req.file?.filename || ""
        });

        user.password = "";
        
        return res.json(user);        
    }
);


export default usersRouter;