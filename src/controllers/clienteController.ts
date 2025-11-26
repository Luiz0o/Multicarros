import express from 'express';
import * as clienteService from '../services/clienteService';

export const getAllClientes = async (req: express.Request, res: express.Response) => {

    const response = await clienteService.getClientesService();

    res.status(response.statusCode).json(response.body);
}

export const getClienteById = async (req: express.Request, res: express.Response) => {

    const cpf = req.params.cpf;
    const response = await clienteService.getClienteByIdService(cpf);
    res.status(response.statusCode).json(response.body);

}

export const createCliente = async (req: express.Request, res: express.Response) => {

    const novoCliente = req.body;
    const response = await clienteService.createClienteService(novoCliente); 

    if(response){
    res.status(response.statusCode).json(response.body);
    }
}

export const updateCliente = async (req: express.Request, res: express.Response) => {

    const cpf = req.params.cpf;
    const clienteAtualizado = req.body;
    const response = await clienteService.updateClienteService(cpf, clienteAtualizado);

    res.status(response.statusCode).json(response.body);
}

export const deleteCliente = async (req: express.Request, res: express.Response) => {

    const cpf = req.params.cpf;
    const response = await clienteService.deleteClienteService(cpf);

    if(response){
        res.status(response.statusCode).json(response.body);
    }else{
        res.status(500).json({ error: 'Unexpected error: response is undefined.' });
    }

}