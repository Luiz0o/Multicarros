import express from 'express';
import * as clienteController from '../controllers/clienteController';

const router = express.Router();

router.get('/clientes', clienteController.getAllClientes)
        .get('/clientes/:cpf', clienteController.getClienteById)
        .post('/clientes', clienteController.createCliente)
        .patch('/clientes/:cpf', clienteController.updateCliente)
        .delete('/clientes/:cpf', clienteController.deleteCliente); 

export default router;