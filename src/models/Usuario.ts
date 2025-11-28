export interface Usuario {
    id: number; // chave primária
    nome: string; 
    email: string;
    telefone: string;
    senha: string;
    data_nascimento: Date;
    cpf: string;
    rg: string;
    criado_em?: Date; // opcional, será gerado na criação
    tipo: number; // 1 - Admin, 2 - Vendedor, 3 - Cliente
}