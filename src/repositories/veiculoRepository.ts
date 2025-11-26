import { supabase } from "../config/dataBaseConfig";
import HttError from "../utils/HttpsError";
import { Veiculo } from "../models/Veiculo";

export const getAllVeiculos = async (): Promise<Veiculo[]> => {
    const { data: veiculos, error } = await supabase
        .from('veiculos')
        .select('*');
        if (!veiculos) throw new HttError(Number(error.code), 'Erro ao buscar veículos');
        return veiculos as Veiculo[];
}

export const getVeiculoById = async (id: string): Promise<Veiculo | null> => {
    const { data: veiculos, error } = await supabase
        .from('veiculos')
        .select('*')
        .eq('id', id)
        .single();
    if (error) {
        if (error.code === 'PGRST116') {
            return null; // Veículo não encontrado
        }
        throw new HttError(Number(error.code), `Erro ao buscar veículo: ${error.message}`); // Outro erro ocorreu
    }
    return veiculos as Veiculo;
}


export const createVeiculo = async (novoVeiculo: Veiculo): Promise<Veiculo> => {
    const { data: veiculos, error } = await supabase
        .from('veiculos')
        .insert(novoVeiculo)
        .select()
        .single();
    
    if (error) {
        // Trata erro de duplicação de chave (placa já existe)
        if (error.code === '23505') {
            throw new HttError(Number(error.code), 'Placa já cadastrada no sistema');
        }
        // Trata erro de violação de constraint
        if (error.code === '23514') {
            throw new HttError(Number(error.code), 'Dados inválidos: verifique os campos obrigatórios');
        }
        // Erro genérico
        throw new HttError(Number(error.code), `Erro ao criar veículo: ${error.message}`);
    }
    
    return veiculos as Veiculo;
}

export const atualizarVeiculo = async (id: string, veiculoAtualizado: Partial<Veiculo>) => {
    const { data: veiculos, error } = await supabase
        .from('veiculos')
        .update(veiculoAtualizado)
        .eq('id', id)
        .select()
        .single();
    if (error) throw new HttError(Number(error.code), `Erro ao atualizar veículo: ${error.message}`);
    return veiculos as Veiculo;
    
}

export const deleteVeiculo = async (id: string): Promise<boolean> => {
    const { error } = await supabase
        .from('veiculos')
        .delete()
        .eq('id', id);
    if (error) {
        if (error.code === 'PGRST116') {
            return false; // Veículo não encontrado
        }
        throw error; // Outro erro ocorreu
    }
    return true; // Exclusão bem-sucedida
}