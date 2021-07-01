import { Request,  Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarServices';

export default class UserAvatarController {
    public async update(req: Request, res: Response ): Promise<Response>  {
        const updateUserAvatar = container.resolve( UpdateUserAvatarService);

        const user = await updateUserAvatar.execute({
            user_id: req.user.id,
            avatarFilename: req.file?.filename || ""
        });

        user.password = "";
        
        return res.json(user);
    } 
}