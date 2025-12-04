export interface Funcionario {
  id?: number; // chave primária, gerado automaticamente
  cpf: string;
  nome: string;
  email: string;
  telefone: string;
  nascimento?: string; // data de nascimento do formulário
  data_nascimento?: Date;
  senha?: string;
  criado_em?: Date;
  tipo?: string;
}
