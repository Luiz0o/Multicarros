import express from 'express';
import veiculos from './veiculoRoutes';
import clientes from './clienteRoutes';
import funcionario from './funcionarioRoutes';
import  acessorio from './acessorioRoutes';
import usuario from './usuarioRoutes';  

const route = (app: express.Application) => {

    
    app.route("/").get((req: express.Request, res: express.Response) => res.status(200).send({ message: "API Multi Carros" }));
    app.use(express.json(), veiculos, clientes, funcionario, acessorio, usuario); // Middleware para JSON
    
}

export default route;