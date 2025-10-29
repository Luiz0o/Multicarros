import express from 'express';
import veiculos from './veiculosRoutes';
import clientes from './clienteRoutes';
import administradores from './admRoutes';

const route = (app: express.Application) => {

    
    app.route("/").get((req: express.Request, res: express.Response) => res.status(200).send({ message: "API Multi Carros" }));
    app.use(express.json(), veiculos, clientes, administradores); // Middleware para JSON
    
}

export default route;