import { supabase } from "../config/dataBaseConfig";
import { Veiculo } from "../models/Veiculo";

// const dataBase: Veiculo[] = [
//     {
//         placa: "ABC1234",
//         tipo: "carro",
//         marca: "Toyota",
//         modelo: "Corolla",
//         anoModelo: 2022,
//         anofabricacao: 2021,
//         cor: "Prata",
//         preco: 95000,
//         renavam: "12345678901",
//         chassi: "9BWZZZ377VT004251",
//         cambio: "automatico",
//         combustivel: "flex",
//         quilometragem: 15000,
//         status: "usado",
//         posicao: true,
//         numeroMotor: "1NZ123456",
//         numeroCambio: "AT123456",
//         dataCadastro: new Date("2023-01-10"),
//         descricao: "Carro em ótimo estado, único dono.",
//         imagemUrl: "https://exemplo.com/corolla.jpg"
//     },
//     {
//         placa: "XYZ5678",
//         tipo: "moto",
//         marca: "Honda",
//         modelo: "CB 500",
//         anoModelo: 2023,
//         anofabricacao: 2023,
//         cor: "Vermelha",
//         preco: 35000,
//         renavam: "98765432109",
//         chassi: "9C2KC0850HR123456",
//         cambio: "manual",
//         combustivel: "gasolina",
//         quilometragem: 500,
//         status: "Novo",
//         posicao: false,
//         numeroMotor: "CB500MTR123",
//         numeroCambio: "CB500CMB123",
//         dataCadastro: new Date("2023-07-15"),
//         descricao: "Moto zero km, pronta para rodar.",
//         imagemUrl: "https://exemplo.com/cb500.jpg"
//     },
//     {
//         placa: "JKL4321",
//         tipo: "caminhao",
//         marca: "Volvo",
//         modelo: "FH 540",
//         anoModelo: 2021,
//         anofabricacao: 2020,
//         cor: "Branco",
//         preco: 420000,
//         renavam: "11223344556",
//         chassi: "YV2RT40A9LA123456",
//         cambio: "automatico",
//         combustivel: "diesel",
//         quilometragem: 80000,
//         status: "usado",
//         posicao: true,
//         numeroMotor: "FH540MTR456",
//         numeroCambio: "FH540CMB456",
//         dataCadastro: new Date("2022-11-20"),
//         descricao: "Caminhão revisado, pronto para trabalho pesado.",
//         imagemUrl: "https://exemplo.com/fh540.jpg"
//     }
// ];


export const getAllVeiculos = async (): Promise<Veiculo[]> => {
    const { data, error } = await supabase
        .from('veiculos')
        .select('*');
        if (error) throw error;
        return data as Veiculo[];
}

export const getVeiculoById = async (placa: string): Promise<Veiculo | null> => {
    const { data, error } = await supabase
        .from('veiculos')
        .select('*')
        .eq('placa', placa)
        .single();
    if (error) {
        if (error.code === 'PGRST116') {
            return null; // Veículo não encontrado
        }
        throw error; // Outro erro ocorreu
    }
    return data as Veiculo;
}


export const createVeiculo = async (novoVeiculo: Veiculo): Promise<Veiculo> => {
    const { data, error } = await supabase
        .from('veiculos')
        .insert(novoVeiculo)
        .select()
        .single();
    
    if (error) {
        // Trata erro de duplicação de chave (placa já existe)
        if (error.code === '23505') {
            throw new Error('Placa já cadastrada no sistema');
        }
        // Trata erro de violação de constraint
        if (error.code === '23514') {
            throw new Error('Dados inválidos: verifique os campos obrigatórios');
        }
        // Erro genérico
        throw new Error(`Erro ao criar veículo: ${error.message}`);
    }
    
    return data as Veiculo;
}

export const atualizarVeiculo = async (placa: string, veiculoAtualizado: Partial<Veiculo>) => {
    const { data, error } = await supabase
        .from('veiculos')
        .update(veiculoAtualizado)
        .eq('placa', placa)
        .select()
        .single();
    if (error) throw error;
    return data as Veiculo;
    
}

export const deleteVeiculo = async (placa: string): Promise<boolean> => {
    const { error } = await supabase
        .from('veiculos')
        .delete()
        .eq('placa', placa);
    if (error) {
        if (error.code === 'PGRST116') {
            return false; // Veículo não encontrado
        }
        throw error; // Outro erro ocorreu
    }
    return true; // Exclusão bem-sucedida
}