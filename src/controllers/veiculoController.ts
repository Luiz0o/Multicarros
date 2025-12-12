import express from "express";
import HttpsError from "../utils/HttpsError";
import * as veiculosServicer from "../services/veiculoServices";

// ✅ FUNÇÃO CORRIGIDA - Agora mantém ID como string
export const getVeiculoByIdComFotos = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const id = req.params.id; // ✅ Mantém como string (não converte para number)
    
    // ✅ Validação básica
    if (!id || id.trim() === "") {
      return res.status(400).json({ 
        error: "ID é obrigatório",
        details: "O parâmetro 'id' não foi fornecido na URL" 
      });
    }

    console.log(`📡 Controller: Buscando veículo ID: ${id}`);

    // ✅ Passa o ID como string para o service
    const response = await veiculosServicer.getVeiculoByIdComFotos(id);
    
    // ✅ Verifica se encontrou o veículo
    if (!response || response.statusCode === 204) {
      return res.status(404).json({ 
        error: "Veículo não encontrado",
        id: id,
        message: `Nenhum veículo encontrado com ID ${id}`
      });
    }

    res.status(response.statusCode).json(response.body);
  } catch (error) {
    console.error("❌ Erro no controller:", error);
    next(new HttpsError(500, "Erro ao buscar veículo com fotos", error));
  }
};

// ✅ Outras funções também corrigidas
export const getVeiculoById = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const id = req.params.id; // ✅ String
    const response = await veiculosServicer.getVeiculoById(id);
    
    if (!response || response.statusCode === 204) {
      return res.status(404).json({ error: "Veículo não encontrado" });
    }
    
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(error);
  }
};

export const updateVeiculo = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const id = req.params.id; // ✅ String
    const veiculoAtualizado = req.body;
    const response = await veiculosServicer.updateVeiculo(id, veiculoAtualizado);
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(new HttpsError(500, "Erro ao atualizar veículo", error));
  }
};

export const deleteVeiculo = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const id = req.params.id; // ✅ String
    const response = await veiculosServicer.deleteVeiculo(id);
    if (response) {
      res.status(response.statusCode).json(response.body);
    } else {
      next(new HttpsError(500, "Resposta inesperada do serviço"));
    }
  } catch (error) {
    next(new HttpsError(500, "Erro ao deletar veículo", error));
  }
};

// ✅ Funções que já estavam corretas
export const getAllVeiculos = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const response = await veiculosServicer.getAllVeiculos();
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(new HttpsError(500, "Erro ao buscar veículos", error));
  }
};

export const getCarrosEstoque = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const response = await veiculosServicer.getCarrosEstoque();
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(new HttpsError(500, "Erro ao buscar carros do estoque", error));
  }
};

export const getAllVeiculosComFotos = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const response = await veiculosServicer.getAllVeiculosComFotos();
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(new HttpsError(500, "Erro ao buscar veículos com fotos", error));
  }
};

export const createVeiculo = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const novoVeiculo = req.body;
    const files = (req.files as Express.Multer.File[]) || [];
    const response = await veiculosServicer.createVeiculo(novoVeiculo, files);

    if (response && typeof response.statusCode === "number") {
      res.status(response.statusCode).json(response.body);
    } else {
      res.status(201).json(response);
    }
  } catch (error) {
    console.error("❌ Erro no controller ao criar veículo:", error);
    next(new HttpsError(500, "Erro ao criar veículo", error));
  }
};