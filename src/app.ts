import express from 'express';
import routes from './routes/index';
import cors from 'cors';

function createApp() {

    const app = express();
    app.use(express.json());
    app.use(cors());
    routes(app);

    return app;
}

export default createApp;
