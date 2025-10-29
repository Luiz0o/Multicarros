export interface Veiculo {
    placa: string;
    tipo: 'carro' | 'moto' | 'caminhao';
    marca: string;
    modelo: string;
    ano_modelo: number;
    fabricacao: number;
    cor: string;
    preco: number;
    renavam: string;
    chassi: string;
    cambio: 'manual' | 'automatico';
    combustivel: 'gasolina' | 'alcool' | 'diesel' | 'flex' | 'eletrico' | 'hibrido';
    km: number;
    status: 'usado' | 'Novo';
    posicao: boolean;
    portas: number; // número de portas, aplicável apenas para carros
    numero_motor: string;
    numero_cambio: string;
    data_cadastro?: Date; // opcional, será gerado na criação
    descricao?: string;
    imagem_url?: string;
}