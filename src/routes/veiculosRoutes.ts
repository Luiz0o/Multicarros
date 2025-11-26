import express from 'express';
import * as veiculosController from  '../controllers/veiculoController';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } }); // Limite de 20MB

router.get('/veiculos', veiculosController.getAllVeiculos)
     .post('/veiculos', upload.array('foto', 8), veiculosController.createVeiculo)
     .get('/veiculos/:id', veiculosController.getVeiculoById)
     .patch('/veiculos/:id', veiculosController.updateVeiculo)
     .delete('/veiculos/:id', veiculosController.deleteVeiculo);

export default router;