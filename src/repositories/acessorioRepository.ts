import {supabase} from "../config/dataBaseConfig";;
import {Acessorio} from "../models/Acessorio";
import HttpsError from "../utils/HttpsError";

export const getAcessoriosRepository = async (): Promise<Acessorio[]> => {
    const {data: acessorios, error} = await supabase
        .from('acessorios')
        .select('*');
    if (!acessorios) throw new HttpsError(Number(error.code),`Erro ao buscar acessórios: ${error?.message}`);
    return acessorios as Acessorio[];
}

export const getAcessorioByIdRepository = async (id: number): Promise<Acessorio | null> => {
    const {data: acessorio, error} = await supabase
        .from('acessorios')
        .select('*')
        .eq('id', id)
        .single();
    if (error) {
        if (error.code === 'PGRST116') {
            return null; // Acessório não encontrado
        }
        throw new HttpsError(Number(error.code),`Erro ao buscar acessório: ${error.message}`); // Outro erro ocorreu
    }
    return acessorio as Acessorio;
}

export const createAcessorioRepository = async (novoAcessorio: Acessorio): Promise<Acessorio> => {
    const {data: acessorio, error} = await supabase
        .from('acessorios')
        .insert(novoAcessorio)
        .select()
        .single();
    if (error) throw new HttpsError(Number(error.code),`Erro ao criar acessório: ${error.message}`);
    return acessorio as Acessorio;
}

export const updateAcessorioRepository = async (id: number, acessorioAtualizado: Partial<Acessorio>): Promise<Acessorio> => {
    const {data: acessorio, error} = await supabase
        .from('acessorios')
        .update(acessorioAtualizado)
        .eq('id', id)
        .select()
        .single();
    if (error) throw new HttpsError(Number(error.code),`Erro ao atualizar acessório: ${error.message}`);
    return acessorio as Acessorio;
}

export const deleteAcessorioRepository = async (id: number): Promise<void> => {
    const {error} = await supabase
        .from('acessorios')
        .delete()
        .eq('id', id);
    if (error) throw new HttpsError(Number(error.code),`Erro ao deletar acessório: ${error.message}`);
}