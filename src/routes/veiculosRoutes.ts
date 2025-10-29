import express from 'express';
import * as veiculosController from  '../controllers/veiculoController';

const router = express.Router();

router.get('/veiculos', veiculosController.getAllVeiculos)
     .post('/veiculos', veiculosController.createVeiculo)
     .get('/veiculos/:placa', veiculosController.getVeiculoById)
     .patch('/veiculos/:placa', veiculosController.updateVeiculo)
     .delete('/veiculos/:placa', veiculosController.deleteVeiculo);

export default router;