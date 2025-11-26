import express from 'express';
import HttpsError from '../utils/HttpsError';
import * as veiculosServicer from '../services/veiculoServices';

export const getAllVeiculos = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {
        const response = await veiculosServicer.getAllVeiculos();
        res.status(response.statusCode).json(response.body);
    } catch (error) {
        next(new HttpsError(500, 'Erro ao buscar veículos', error));
    }
}

export const getVeiculoById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {
        const id = req.params.id;
        const response = await veiculosServicer.getVeiculoById(id);
        res.status(response.statusCode).json(response.body);
    } catch (error) {
        next(error);
    }
}


export const createVeiculo = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {
        const novoVeiculo = req.body;
        const file = req.file ? [req.file as Express.Multer.File] : ([] as Express.Multer.File[]);
        const response = await veiculosServicer.createVeiculo(novoVeiculo, file);

        function isHttpResponse(obj: any): obj is { statusCode: number; body: any } {
            return obj && typeof obj.statusCode === 'number';
        }

        if (isHttpResponse(response)) {
            res.status(response.statusCode).json(response.body);
        } else {
            // service returned the created resource directly
            res.status(201).json(response);
        }
    } catch (error) {
        next(new HttpsError(500, 'Erro ao criar veículo', error));
    }
}

export const updateVeiculo = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {
        const id = req.params.id;
        const veiculoAtualizado = req.body;
        const response = await veiculosServicer.updateVeiculo(id, veiculoAtualizado);
        res.status(response.statusCode).json(response.body);
    } catch (error) {
        next(new HttpsError(500, 'Erro ao atualizar veículo', error));
    }
}

export const deleteVeiculo = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const id = req.params.id;
        const response = await veiculosServicer.deleteVeiculo(id);
        if (response) {
            res.status(response.statusCode).json(response.body);
        } else {
            next(new HttpsError(500, 'Resposta inesperada do serviço'));
        }
    } catch (error) {
        next(new HttpsError(500, 'Erro ao deletar veículo', error));
    }
}