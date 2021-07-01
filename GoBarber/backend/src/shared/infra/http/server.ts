import 'reflect-metadata';
import express, { Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from './routes';

import '../typeorm';
import '@shared/container';

import uploadConfig from '../../../config/upload';

import AppError from '../../errors/AppError';

const app = express();

app.use(cors());

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

//Middleware para tratar os erros que sao conhecidos (AppError)
app.use(( err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
});

app.listen(3333, () => {
    console.log('🎉 The server on port 3333')
});

