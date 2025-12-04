export interface Veiculo {
  // Campos principais (baseados na tabela do Supabase)
  placa: string; // chave primária
  marca?: string;
  fabricacao?: number;
  modelo?: string;
  cor?: string;
  combustivel?: string;
  km?: number;
  status?: string;
  tipo?: string;
  portas?: number;
  renavam?: string;
  chassi?: string;
  ano_modelo?: number;
  preco?: number;
  cambio?: string;
  posicao?: boolean;
  numero_motor?: string;
  numero_cambio?: string;
  data_cadastro?: Date;
  descricao?: string;

  // Campos extras para compatibilidade
  id?: number;
  marcaModelo?: string;
  anoFabricacao?: number;
  anoModelo?: number;
  categoria?: string;
  especie?: string;
  foto?: string;
}
