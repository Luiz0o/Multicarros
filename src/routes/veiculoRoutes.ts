import express from 'express';
import * as veiculoController from  '../controllers/veiculoController';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } }); // Limite de 20MB

router.get('/veiculos', veiculoController.getAllVeiculos)
     .post('/veiculos', upload.array('foto', 8), veiculoController.createVeiculo)
     .get('/veiculos/:id', veiculoController.getVeiculoById)
     .patch('/veiculos/:id', veiculoController.updateVeiculo)
     .delete('/veiculos/:id', veiculoController.deleteVeiculo);

export default router;