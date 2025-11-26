import { Funcionario } from "../models/Funcionario";
import * as admRepository from '../repositories/funcionarioRepository'
import * as HttpResponse from '../utils/http-helper';


export const getAllFuncionarioesService = async () => {

    const data = await admRepository.getAllFuncionarioesRepository();
    let response = null; 

    if(data) {
        response  = await HttpResponse.ok(data);
    }else {
        response = await HttpResponse.noContent();
    }

    return response;
}

export const getFuncionarioByIdService = async (id: number) => {

    const data = await admRepository.getFuncionarioByIdRepository(id);
    let response = null;

    if(data) {
        response = await HttpResponse.ok(data);
    } else {
        response = await HttpResponse.noContent();
    }

    return response;
}

export const createFuncionarioService = async (novoFuncionario: Funcionario) => {
    let response = null;

    if (novoFuncionario){

        await admRepository.createFuncionarioRepository(novoFuncionario);
        return await HttpResponse.created();
        
    }else {
        return HttpResponse.badRequest(new Error("Dados inválidos"));
    }
}

export const updateFuncionarioService = async (id: number, FuncionarioAtualizado: Funcionario) => {
    const data = await admRepository.updateFuncionarioRepository(id, FuncionarioAtualizado);
    const response = await HttpResponse.ok(data);
    return response;
}

export const deleteFuncionarioService = async (id: number) => {
    
    if(id){
        await admRepository.deleteFuncionarioRepository(id);
         return await HttpResponse.ok({ message: 'Funcionario deletado com sucesso' });
    }
}