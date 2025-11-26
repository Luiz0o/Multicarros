export interface Foto {
    id: number; // chave primária
    veiculo_id: number; // chave estrangeira referenciando Veiculo
    url: string; // URL da imagem
    ordem: number; // ordem da imagem para exibição
    criado_em?: Date; // data de criação
}