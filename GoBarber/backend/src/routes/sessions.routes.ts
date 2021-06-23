import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticationUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        const autheticateUser = new AuthenticateUserService();

        const { user, token } = await autheticateUser.execute({
            email,
            password
        })

        user.password = "";
        
        res.json({ user, token });
    } catch ( err: any ) {
        return res.status(400).json({ error: err.message})
    }
});



export default sessionsRouter;