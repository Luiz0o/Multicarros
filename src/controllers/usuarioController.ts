import express from 'express';
import HttpsError from '../utils/HttpsError'; 
import * as usuarioService from '../services/usuarioService';

export const getAllUsuarios = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {
        const response = await usuarioService.getAllUsuarios();
        res.status(response.statusCode).json(response.body);
    } catch (error) {
        next(new HttpsError(500, 'Erro ao buscar usuários', error));
    }
}   

export const getUsuarioById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    
    try {
        const id = req.params.id;
        const response = await usuarioService.getUsuarioById(id);
        res.status(response.statusCode).json(response.body);
    } catch (error) {
        next(new HttpsError(500, 'Erro ao buscar usuário por ID', error));
    }
}   

export const createUsuario = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {
        const novoUsuario = req.body;
        const response = await usuarioService.createUsuario(novoUsuario);
        res.status(response.statusCode).json(response.body);
    } catch (error) {
        next(new HttpsError(500, 'Erro ao criar usuário', error));
    }
}   

export const updateUsuario = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {
        const id = req.params.id;
        const usuarioAtualizado = req.body;
        const response = await usuarioService.updateUsuario(id, usuarioAtualizado);
        res.status(response.statusCode).json(response.body);
    } catch (error) {
        next(new HttpsError(500, 'Erro ao atualizar usuário', error));
    }
}   

export const deleteUsuario = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const id = req.params.id;
        const response = await usuarioService.deleteUsuario(id);
        res.status(response.statusCode).json(response.body);
    } catch (error) {
        next(new HttpsError(500, 'Erro ao deletar usuário', error));
    }
}