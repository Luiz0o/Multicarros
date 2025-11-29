import express from "express";
import routes from "./routes/index";
import cors from "cors";
import path from "path";
import errorHandler from "./middleware/tratamentoErro";

function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  // Servir arquivos estáticos da pasta src/public
  const publicDir = path.join(process.cwd(), "public");
  app.use("/public", express.static(publicDir));
  app.use("/HTML", express.static(path.join(publicDir, "HTML")));
  app.use("/css", express.static(path.join(publicDir, "css")));
  app.use("/js", express.static(path.join(publicDir, "js")));
  app.use("/images", express.static(path.join(publicDir, "images")));

  // Servir index.html na rota raiz
  app.get("/", (req, res) => {
    res.sendFile(path.join(publicDir, "HTML", "index.html"));
  });

  routes(app);
  app.use(errorHandler);
  return app;
}

export default createApp;
