import { supabase } from "../config/dataBaseConfig";
import { Cliente } from "../models/Cliente";

// const dataBase: Cliente[] = [
//     {
//         cpf: "12345678900",
//         nome: "Carlos Silva",
//         email: "carlos.silva@email.com",
//         telefone: "11999999999",
//         Rg: "1234567"
//     },
//     {
//         cpf: "98765432100",
//         nome: "Ana Souza",
//         email: "ana.souza@email.com",
//         telefone: "11988888888",
//         Rg: "7654321"
//     }
// ];

export const getClienteRepository = async (): Promise<Cliente[]> => {
    const { data, error } = await supabase
        .from('clientes')
        .select('*');
    if (error) throw error;
    return data as Cliente[];
    // return dataBase;
}

export const getClienteByIdRepository = async (cpf: string): Promise<Cliente | null> => {
    const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .eq('cpf', cpf)
        .single();
    if (error) {
        if (error.code === 'PGRST116') {
            return null; // Cliente não encontrado
        }
        throw error; // Outro erro ocorreu
    }
    return data as Cliente;
    
}

export const createClienteRepository = async (cliente: Cliente): Promise<Cliente | null> => {
    const { data, error } = await supabase
        .from('clientes')
        .insert(cliente)
        .select()
        .single();
    if (error) throw error;
    return data as Cliente;
    
}

export const updateClienteRepository = async (cpf: string, clienteAtualizado: Cliente): Promise<Cliente | null> => {
    const { data, error } = await supabase
        .from('clientes')
        .update(clienteAtualizado)
        .eq('cpf', cpf)
        .select()
        .single();
    if (error) throw error;
    return data as Cliente;   
}

export const deleteClienteRepository = async (cpf: string): Promise<boolean> => {
    const { error } = await supabase
        .from('clientes')
        .delete()
        .eq('cpf', cpf);
    if (error) {
        if (error.code === 'PGRST116') {
            return false; // Cliente não encontrado
        }
        throw error; // Outro erro ocorreu
    }
    return true;
}