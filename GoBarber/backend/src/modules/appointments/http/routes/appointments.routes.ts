import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthentication';

import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (req, res) => {
    //     const appointments = await appointmentsRepository.find();
    
    //     return res.json(appointments);
    // })

appointmentsRouter.post('/', appointmentsController.create);



export default appointmentsRouter;