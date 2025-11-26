import express from 'express';
import * as admService from '../services/funcionarioService';


export const getAllFuncionarioes = async (req: express.Request, res: express.Response) => {

    const response = await admService.getAllFuncionarioesService();
    res.status(response.statusCode).json(response.body);
    
};

export const getFuncionarioById = async (req: express.Request, res: express.Response) => {

    const id = req.params.id;  
    const response = await admService.getFuncionarioByIdService(Number(id));
    res.status(response.statusCode).json(response.body);
}

export const createFuncionario = async (req: express.Request, res: express.Response) => {
    const Funcionario = req.body;
    const response = await admService.createFuncionarioService(Funcionario);

    if(response) {
        res.status(response.statusCode).json(response.body);
    }
}

export const updateFuncionario = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    const FuncionarioAtualizado = req.body;

    const response = await admService.updateFuncionarioService(Number(id), FuncionarioAtualizado);
    res.status(response.statusCode).json(response.body);
}

export const deleteFuncionario = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    const response = await admService.deleteFuncionarioService(Number(id));
    if (response) {
        res.status(response.statusCode).json(response.body);
    } else {
        res.status(500).json({ error: 'Unexpected error: response is undefined.' });
    }
}