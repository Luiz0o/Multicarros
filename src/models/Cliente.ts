export interface Cliente {
  cpf: string; // chave primária
  nome: string;
  email: string;
  telefone: string;
  Rg?: string;
  nascimento?: string; // data de nascimento do formulário
  data_nascimento?: Date; // campo do banco
  senha?: string;
  criado_em?: Date;
}
