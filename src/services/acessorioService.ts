import * as acessorioRepository from '../repositories/acessorioRepository';
import * as HttpResponse from '../utils/http-helper';

export const getAllAcessorios = async () => {
    const data = await acessorioRepository.getAcessoriosRepository();
    let response = null;
    
    if (data) {
        response = await HttpResponse.ok(data);
    }else{
        response = await HttpResponse.noContent();
    }
    return response;
}

export const getAcessorioById = async (id: number) => {
    const acessorio = await acessorioRepository.getAcessorioByIdRepository(id);
    let response = null;

    if (acessorio) {
        response = await HttpResponse.ok(acessorio);
    } else {
        response = await HttpResponse.noContent();
    }

    return response;
}   

export const createAcessorio = async (novoAcessorio: any) => {  
    try {   
        if (!novoAcessorio) {
            return await HttpResponse.badRequest('Dados do acessório são obrigatórios');
        }

        const camposObrigatorios = ['nome', 'descricao', 'preco'];
        for (const campo of camposObrigatorios) {
            if (!novoAcessorio[campo]) {
                return await HttpResponse.badRequest(`Campo "${campo}" é obrigatório`);
            }
        }

        await acessorioRepository.createAcessorioRepository(novoAcessorio);
        return await HttpResponse.created();
    } catch (error: any) {
        return await HttpResponse.internalServerError(`Erro ao criar acessório: ${error.message}`);
    }   
}

export const updateAcessorio = async (id: number, acessorioAtualizado: any) => {
    try {
        const data = await acessorioRepository.updateAcessorioRepository(id, acessorioAtualizado);
        const response = await HttpResponse.ok(data);
        return response;
    } catch (error: any) {
        return await HttpResponse.internalServerError(`Erro ao atualizar acessório: ${error.message}`);
    }
}   

export const deleteAcessorio = async (id: number) => {
    try {
        if (id) {
            await acessorioRepository.deleteAcessorioRepository(id);
            return await HttpResponse.ok({ message: 'Acessório deletado com sucesso' });
        }  
    } catch (error: any) {
        return await HttpResponse.internalServerError(`Erro ao deletar acessório: ${error.message}`);
    }
}