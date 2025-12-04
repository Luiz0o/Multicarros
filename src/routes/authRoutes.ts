import {Router} from "express";
import * as authController from "../controllers/authController";

const router = Router();

// POST /login - Fazer login
router.post("/login", authController.login);

// POST /register - Registrar novo usuário
router.post("/register", authController.register);

// GET /verify - Verificar token
router.get("/verify", authController.verifyToken);

export default router;
