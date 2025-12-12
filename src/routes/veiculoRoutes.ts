import express from "express";
import * as veiculoController from "../controllers/veiculoController";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { 
    fileSize: 10 * 1024 * 1024, // Limite de 10MB por arquivo
    files: 8 // Máximo de 8 arquivos
  },
  fileFilter: (req, file, cb) => {
    // ✅ VALIDAÇÃO DE TIPO DE ARQUIVO
    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp'
    ];
    
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true); // Aceita o arquivo
    } else {
      cb(new Error(`Formato inválido: ${file.mimetype}. Use JPEG, PNG ou WebP.`));
    }
  }
});

// rota pública para exibir estoque (home)
router.get("/estoque", veiculoController.getCarrosEstoque);

router
  .get("/veiculos", veiculoController.getAllVeiculos)
  .get("/veiculos-com-fotos", veiculoController.getAllVeiculosComFotos) // Rota para pegar os veiculos com suas fotos
  .get("/veiculos/:id/completo", veiculoController.getVeiculoByIdComFotos)
  .post("/veiculos", upload.array("foto", 8), veiculoController.createVeiculo)
  .get("/veiculos/:id", veiculoController.getVeiculoById)
  .patch("/veiculos/:id", veiculoController.updateVeiculo)
  .delete("/veiculos/:id", veiculoController.deleteVeiculo);

export default router;
