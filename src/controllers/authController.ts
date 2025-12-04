import express from "express";
import * as authService from "../services/authService";
import HttpsError from "../utils/HttpsError";

export const login = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    console.log("📥 Dados recebidos:", req.body);
    const {email, senha} = req.body;

    if (!email || !senha) {
      console.log("❌ Email ou senha faltando");
      return res.status(400).json({
        success: false,
        message: "Email e senha são obrigatórios",
      });
    }

    console.log("🔐 Tentando login com:", email);
    const response = await authService.login(email, senha);
    console.log("✅ Resposta do serviço:", response);
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    console.error("❌ Erro no controller:", error);
    next(new HttpsError(500, "Erro ao fazer login", error));
  }
};

export const register = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const userData = req.body;
    const response = await authService.register(userData);
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(new HttpsError(500, "Erro ao registrar usuário", error));
  }
};

export const verifyToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token não fornecido",
      });
    }

    const response = await authService.verifyToken(token);
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(new HttpsError(401, "Token inválido", error));
  }
};
