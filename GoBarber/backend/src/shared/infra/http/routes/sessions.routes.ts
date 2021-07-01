import { Router } from 'express';

import AuthenticateUserService from '../../../../modules/users/services/AuthenticationUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {

    const { email, password } = req.body;

    const autheticateUser = new AuthenticateUserService();

    const { user, token } = await autheticateUser.execute({
        email,
        password
    })

    user.password = "";
    
    res.json({ user, token });

});



export default sessionsRouter;