import { Administrador } from "../models/Administrador";
import * as admRepository from '../repositories/admRepository'
import * as HttpResponse from '../utils/http-helper';


export const getAllAdministradoresService = async () => {

    const data = await admRepository.getAllAdministradoresRepository();
    let response = null; 

    if(data) {
        response  = await HttpResponse.ok(data);
    }else {
        response = await HttpResponse.noContent();
    }

    return response;
}

export const getAdministradorByIdService = async (id: number) => {

    const data = await admRepository.getAdministradorByIdRepository(id);
    let response = null;

    if(data) {
        response = await HttpResponse.ok(data);
    } else {
        response = await HttpResponse.noContent();
    }

    return response;
}

export const createAdministradorService = async (novoAdministrador: Administrador) => {
    let response = null;

    if (novoAdministrador){

        await admRepository.createAdministradorRepository(novoAdministrador);
        return await HttpResponse.created();
        
    }else {
        return HttpResponse.badRequest(new Error("Dados inválidos"));
    }
}

export const updateAdministradorService = async (id: number, administradorAtualizado: Administrador) => {
    const data = await admRepository.updateAdministradorRepository(id, administradorAtualizado);
    const response = await HttpResponse.ok(data);
    return response;
}

export const deleteAdministradorService = async (id: number) => {
    
    if(id){
        await admRepository.deleteAdministradorRepository(id);
         return await HttpResponse.ok({ message: 'Administrador deletado com sucesso' });
    }
}