import express from 'express';
import * as admService from '../services/admService';


export const getAllAdministradores = async (req: express.Request, res: express.Response) => {

    const response = await admService.getAllAdministradoresService();
    res.status(response.statusCode).json(response.body);
    
};

export const getAdministradorById = async (req: express.Request, res: express.Response) => {

    const id = req.params.id;  
    const response = await admService.getAdministradorByIdService(Number(id));
    res.status(response.statusCode).json(response.body);
}

export const createAdministrador = async (req: express.Request, res: express.Response) => {
    const administrador = req.body;
    const response = await admService.createAdministradorService(administrador);

    if(response) {
        res.status(response.statusCode).json(response.body);
    }
}

export const updateAdministrador = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    const administradorAtualizado = req.body;

    const response = await admService.updateAdministradorService(Number(id), administradorAtualizado);
    res.status(response.statusCode).json(response.body);
}

export const deleteAdministrador = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    const response = await admService.deleteAdministradorService(Number(id));
    if (response) {
        res.status(response.statusCode).json(response.body);
    } else {
        res.status(500).json({ error: 'Unexpected error: response is undefined.' });
    }
}