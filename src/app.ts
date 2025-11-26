import express from 'express';
import routes from './routes/index';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import errorHandler from './middleware/tratamentoErro';

function createApp() {

    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    //servir o fronten stático 
    app.use('/', express.static(path.join(__dirname,'..', 'public')));
    routes(app);

    app.use(errorHandler);

    return app;
}

export default createApp;
