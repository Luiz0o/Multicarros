import express from "express";
import routes from "./routes/index";
import cors from "cors";
import path from "path";
import errorHandler from "./middleware/tratamentoErro";

function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Servir arquivos estáticos da pasta `src/public` (os HTML/JS/CSS do front-end)
  const publicDir = path.join(process.cwd(), "src", "public");
  // Suporte a caminhos que referenciam '/public/...' nos HTML (ex.: ../../public/css/...)
  app.use("/public", express.static(publicDir));
  // Também servir diretamente a raiz estática (ex.: /HTML/index.html)
  app.use("/", express.static(publicDir));
  routes(app);

  app.use(errorHandler);

  return app;
}

export default createApp;
