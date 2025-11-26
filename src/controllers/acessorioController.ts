import express from 'express';
import HttpsError from '../utils/HttpsError';
import * as acessorioService from '../services/acessorioService';


export const getAllAcessorios = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {
        const response = await acessorioService.getAllAcessorios();
        res.status(response.statusCode).json(response.body);
    } catch (error) {
        next(new HttpsError(500, 'Erro ao buscar acessórios', error));
    }
}   

export const getAcessorioById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    
    try {
        const id = Number(req.params.id);
        const response = await acessorioService.getAcessorioById(id);
        res.status(response.statusCode).json(response.body);
    } catch (error) {
        next(new HttpsError(500, 'Erro ao buscar acessório por ID', error));
    }
}

export const createAcessorio = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {
        const novoAcessorio = req.body;
        const response = await acessorioService.createAcessorio(novoAcessorio);
        res.status(response.statusCode).json(response.body);
    } catch (error) {
        next(new HttpsError(500, 'Erro ao criar acessório', error));
    }
}

export const updateAcessorio = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {
        const id = Number(req.params.id);
        const acessorioAtualizado = req.body;
        const response = await acessorioService.updateAcessorio(id, acessorioAtualizado);
        res.status(response.statusCode).json(response.body);
    } catch (error) {
        next(new HttpsError(500, 'Erro ao atualizar acessório', error));
    }
}

export const deleteAcessorio = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const id = Number(req.params.id);
        const response = await acessorioService.deleteAcessorio(id);
        if (response) {
            res.status(response.statusCode).json(response.body);
        } else {
            next(new HttpsError(500, 'Resposta inesperada do serviço'));
        }
    } catch (error) {
        next(new HttpsError(500, 'Erro ao deletar acessório', error));
    }
}