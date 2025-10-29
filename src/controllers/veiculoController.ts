import express from 'express';
import * as veiculosServicer from '../services/veiculoServices';

export const getAllVeiculos = async (req: express.Request, res: express.Response) => {

    const response = await veiculosServicer.getAllVeiculos();
    res.status(response.statusCode).json(response.body);
}

export const getVeiculoById = async (req: express.Request, res: express.Response) => {

    
    const placa = req.params.placa;
    const response = await veiculosServicer.getVeiculoById(placa);
    res.status(response.statusCode).json(response.body);
}


export const createVeiculo = async (req: express.Request, res: express.Response) => {
    try {
        const novoVeiculo = req.body;
        
        // Log para debug (remover em produção)
        console.log('Dados recebidos:', JSON.stringify(novoVeiculo, null, 2));
        
        const response = await veiculosServicer.createVeiculo(novoVeiculo);
        
        if (response) {
            res.status(response.statusCode).json(response.body);
        } else {
            res.status(500).json({ 
                error: 'Resposta inesperada do serviço' 
            });
        }
    } catch (error) {
        console.error('Erro no controller createVeiculo:', error);
        res.status(500).json({ 
            error: 'Erro interno do servidor',
            details: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
}

export const updateVeiculo = async (req: express.Request, res: express.Response) => {
    
    const placa = req.params.placa;
    const veiculoAtualizado = req.body;
    const response = await veiculosServicer.updateVeiculo(placa, veiculoAtualizado);
    res.status(response.statusCode).json(response.body);
}

export const deleteVeiculo = async (req: express.Request, res: express.Response) => {
    const placa = req.params.placa;
    const response = await veiculosServicer.deleteVeiculo(placa);
    if (response) {
        res.status(response.statusCode).json(response.body);
    } else {
        res.status(500).json({ error: 'Unexpected error: response is undefined.' });
    }
}