import express from 'express';

import { helloWorldRoute } from './routes';


const app = express();

app.get('/', helloWorldRoute);

app.listen(3333);