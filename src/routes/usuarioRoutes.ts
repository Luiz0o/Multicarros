import express from 'express';
import * as usuarioController from '../controllers/usuarioController';

const router = express.Router();

router.get('/usuarios', usuarioController.getAllUsuarios)
        .get('/usuarios/:id', usuarioController.getUsuarioById)  
        .post('/usuarios', usuarioController.createUsuario)
        .patch('/usuarios/:id', usuarioController.updateUsuario)
        .delete('/usuarios/:id', usuarioController.deleteUsuario);

export default router;