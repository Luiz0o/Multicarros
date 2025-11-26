import express from 'express';
import * as admController from '../controllers/funcionarioController';

const router = express.Router();

router.get('/funcionarios', admController.getAllFuncionarioes)
        .get('/funcionarios/:id', admController.getFuncionarioById)
        .post('/funcionarios', admController.createFuncionario)
        .patch('/funcionarios/:id', admController.updateFuncionario)
        .delete('/funcionarios/:id', admController.deleteFuncionario); 

export default router;
