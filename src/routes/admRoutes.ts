import express from 'express';
import * as admController from '../controllers/admController';

const router = express.Router();

router.get('/administradores', admController.getAllAdministradores)
        .get('/administradores/:id', admController.getAdministradorById)
        .post('/administradores', admController.createAdministrador)
        .patch('/administradores/:id', admController.updateAdministrador)
        .delete('/administradores/:id', admController.deleteAdministrador); 

export default router;
