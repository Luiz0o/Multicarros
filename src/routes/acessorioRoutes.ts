import express from "express";
import * as acessorioController from "../controllers/acessorioController";

const router = express.Router();

router.get('/acessorios', acessorioController.getAllAcessorios)
        .get('/acessorios/:id', acessorioController.getAcessorioById)  
        .post('/acessorios', acessorioController.createAcessorio)
        .patch('/acessorios/:id', acessorioController.updateAcessorio)
        .delete('/acessorios/:id', acessorioController.deleteAcessorio);

export default router; 