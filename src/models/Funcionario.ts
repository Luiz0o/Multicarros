export interface Funcionario {
    id: number; // chave primária
    cpf?: string; 
    nome?: string;
    email?: string;
    telefone: string;
    data_nascimento?: Date;
    criado_em?: Date;
    tipo?: string; 
}
