
import * as veiculoRepository from '../repositories/veiculoRepository';
import * as HttpResponse from '../utils/http-helper';
import * as fotosVeiculoRepository from '../repositories/fotosVeiculoRepository';

export const getAllVeiculos = async () => {
    // Lógica para obter todos os veículos

    
    const data = await veiculoRepository.getAllVeiculos();
    let response = null;
    
    if (data) {
        response = await HttpResponse.ok(data);
    }else{
        response = await HttpResponse.noContent();
    }
    return response;

}

export const getVeiculoById = async (id: string) => {
    const veiculo = await veiculoRepository.getVeiculoById(id);
    let response = null;

    if (veiculo) {
        response = await HttpResponse.ok(veiculo);
    } else {
        response = await HttpResponse.noContent();
    }

    return response;
}



export const createVeiculo = async (novoVeiculo: any, files?: Express.Multer.File[]) => {
    try {
        // Validações básicas
        if (!novoVeiculo) {
            return await HttpResponse.badRequest('Dados do veículo são obrigatórios');
        }

        // Validar campos obrigatórios
        const camposObrigatorios = ['placa', 'tipo', 'marca', 'modelo', 'preco'];
        for (const campo of camposObrigatorios) {
            if (!novoVeiculo[campo]) {
                return await HttpResponse.badRequest(`Campo "${campo}" é obrigatório`);
            }
        }

        // Validar formato da placa (padrão brasileiro)
        const placaRegex = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;
        if (!placaRegex.test(novoVeiculo.placa.toUpperCase())) {
            return await HttpResponse.badRequest('Formato de placa inválido (ex: ABC1D23)');
        }

        // Validar tipo de veículo
        const tiposValidos = ['carro', 'moto', 'caminhao'];
        if (!tiposValidos.includes(novoVeiculo.tipo)) {
            return await HttpResponse.badRequest('Tipo de veículo inválido (carro, moto ou caminhao)');
        }

        // Normalizar placa para maiúsculo
        novoVeiculo.placa = novoVeiculo.placa.toUpperCase();

        const created = await veiculoRepository.createVeiculo(novoVeiculo);

    const fotosCadastradas = [];

    if (files && files.length) {
        for (let i = 0; i < files.length; i++) {
            const f = files[i];
            // extrair extensão segura
            const ext = (f.mimetype.split('/')[1] || 'jpg').split('+')[0];
            const path = `veiculos/${created.id}/${Date.now()}-${i}.${ext}`;
            const foto = await fotosVeiculoRepository.uploadAndCreateFoto(Number(created.id), f.buffer, path, f.mimetype, i + 1);
            fotosCadastradas.push(foto);
        }
    }

    return { veiculo: created, fotos: fotosCadastradas };

    } catch (error) {
        console.error('Erro em createVeiculo:', error);
        return await HttpResponse.badRequest(
            error instanceof Error ? error.message : 'Erro ao criar veículo'
        );
    }
}


export const updateVeiculo = async (placa: string, veiculoAtualizado: any) => {
    const data = await veiculoRepository.atualizarVeiculo(placa, veiculoAtualizado);
    const response = await HttpResponse.ok(data);
    return response;
}

export const deleteVeiculo = async (placa: string) => {

    if (placa){
        await veiculoRepository.deleteVeiculo(placa);
        return await HttpResponse.ok({ message: 'Veículo deletado com sucesso' });
    }
}