import * as usuarioRepository from '../repositories/usuarioRepository';
import * as HttpResponse from '../utils/http-helper';

export const getAllUsuarios = async () => {
    // Lógica para obter todos os usuários
    const data = await usuarioRepository.getAllUsuarios();
    let response = null;
    
    if (data) {
        response = await HttpResponse.ok(data);
    }else{
        response = await HttpResponse.noContent();
    }
    return response;
}

export const getUsuarioById = async (id: string) => {
    const usuario = await usuarioRepository.getUsuarioById(id);
    let response = null;

    if (usuario) {
        response = await HttpResponse.ok(usuario);
    } else {
        response = await HttpResponse.noContent();
    }

    return response;
}   

export const createUsuario = async (novoUsuario: any) => {  
    try {   
        if (!novoUsuario) {
            return await HttpResponse.badRequest('Dados do usuário são obrigatórios');
        }

        const camposObrigatorios = ['nome', 'email', 'senha'];
        for (const campo of camposObrigatorios) {
            if (!novoUsuario[campo]) {
                return await HttpResponse.badRequest(`Campo "${campo}" é obrigatório`);
            }
        }

        await usuarioRepository.createUsuario(novoUsuario);
        return await HttpResponse.created();
    } catch (error: any) {
        return await HttpResponse.internalServerError(`Erro ao criar usuário: ${error.message}`);
    }   
}

export const updateUsuario = async (id: string, usuarioAtualizado: any) => {
    try {
        const data = await usuarioRepository.atualizarUsuario(id, usuarioAtualizado);
        const response = await HttpResponse.ok(data);
        return response;
    } catch (error: any) {
        return await HttpResponse.internalServerError(`Erro ao atualizar usuário: ${error.message}`);
    }
}   

export const deleteUsuario = async (id: string) => {
    try {
        // Lógica para deletar usuário
        // Exemplo: await usuarioRepository.deleteUsuario(id);
        return await HttpResponse.noContent();
    } catch (error: any) {
        return await HttpResponse.internalServerError(`Erro ao deletar usuário: ${error.message}`);
    }
}    


 