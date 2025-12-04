import express from "express";
import veiculos from "./veiculoRoutes";
import clientes from "./clienteRoutes";
import funcionario from "./funcionarioRoutes";
import acessorio from "./acessorioRoutes";
import usuario from "./usuarioRoutes";
import auth from "./authRoutes";

const route = (app: express.Application) => {
  // Rotas da API
  app.use(auth);
  app.use(veiculos);
  app.use(clientes);
  app.use(funcionario);
  app.use(acessorio);
  app.use(usuario);

  // Rota de teste da API
  app
    .route("/api")
    .get((req: express.Request, res: express.Response) =>
      res.status(200).send({message: "API Multi Carros"})
    );
};

export default route;
