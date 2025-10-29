import { supabase } from "../config/dataBaseConfig";
import { Administrador } from "../models/Administrador";

// const dataBase: Administrador[] = [
//     {
//         id: 1,
//         cpf: "11122233344",
//         nome: "João Admin",
//         email: "joao.admin@email.com"
//     },
//     {
//         id: 2,
//         cpf: "55566677788",
//         nome: "Maria Gerente",
//         email: "maria.gerente@email.com"
//     }
// ];

export const getAllAdministradoresRepository = async (): Promise<Administrador[]> => {
    const { data, error } = await supabase
        .from('administradores')
        .select('*');
    if (error) throw error;
    return data as Administrador[];
}  

export const getAdministradorByIdRepository = async (id: number): Promise<Administrador | null> => {
    const { data, error } = await supabase
        .from('administradores')
        .select('*')
        .eq('id', id)
        .single();
    if (error) {
        if (error.code === 'PGRST116') {
            return null; // Administrador não encontrado
        }
        throw error; // Outro erro ocorreu
    }
    return data as Administrador;
}

export const createAdministradorRepository = async (novoAdministrador: Administrador): Promise<Administrador> => {
    const { data, error } = await supabase
        .from('administradores')
        .insert(novoAdministrador)
        .select()
        .single();
    if (error) throw error;
    return data as Administrador;
}

export const updateAdministradorRepository = async (id: number, administradorAtualizado: Administrador): Promise<Administrador | null> => {

    const { data, error } = await supabase
        .from('administradores')
        .update(administradorAtualizado)
        .eq('id', id)
        .select()
        .single();
    if (error) throw error;
    return data as Administrador;
}

export const deleteAdministradorRepository = async (id: number): Promise<boolean> => {
    const { error } = await supabase
        .from('administradores')
        .delete()
        .eq('id', id);
    if (error) {
        if (error.code === 'PGRST116') {
            return false; // Administrador não encontrado
        }
        throw error; // Outro erro ocorreu
    }
    return true;
}