import { Request,  Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '../../../services/AuthenticateUserService';

export default class SessionsController {
    public async create(req: Request, res: Response ): Promise<Response>  {
        const { email, password } = req.body;
    
        const autheticateUser = container.resolve(AuthenticateUserService);
    
        const { user, token } = await autheticateUser.execute({
            email,
            password
        })
    
        user.password = "";
        
        return res.json({ user, token });
    }
}