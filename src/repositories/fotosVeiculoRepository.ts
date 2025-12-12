import {supabase} from "../config/dataBaseConfig";
import HttError from "../utils/HttpsError";
import {Foto} from "../models/Foto";


//get imagens de um veiculo 
export const getFotosByVeiculoId = async (veiculo_id: string): Promise<Foto[]> => {
    const { data, error } = await supabase
        .from('fotos')
        .select('*')
        .eq('veiculo_id', veiculo_id)
        .order('ordem', { ascending: true });

    if (error) {
        throw new HttError(500, `Erro ao buscar fotos: ${error.message}`);
    }

    return data;
}

/**
 * Faz upload do buffer para o bucket 'fotos' no Supabase Storage e cria o registro
 * na tabela 'fotos' relacionando com veiculo_id.
 *
 * Parâmetros:
 * - veiculo_id: id do veículo (foreign key)
 * - buffer: Buffer da imagem (multer memoryStorage)
 * - path: caminho/filename dentro do bucket (ex: veiculos/123/...). Deve ser único.
 * - contentType: tipo MIME (ex: 'image/jpeg')
 * - ordem: número da ordem/exibição da foto
 *
 * Retorna o registro inserido da tabela fotos.
 */
export const uploadAndCreateFoto = async (
    veiculo_id: string,
    buffer: Buffer,
    path: string,
    contentType: string,
    ordem: number
) => {
    const bucket = 'veiculos'; // assegure que esse bucket exista no Supabase

    // 1) upload para o Storage
    const { error: uploadError } = await supabase.storage.from(bucket).upload(path, buffer, {
        contentType,
        upsert: false
    });

    if (uploadError) {
        throw new Error(`Erro ao subir imagem para storage: ${uploadError.message}`);
    }

    // 2) obter URL pública (se bucket for público)
    // Se o bucket for privado, troque por createSignedUrl(path, ttl)
    const { data: publicData } = await supabase.storage.from(bucket).getPublicUrl(path);
    const url = publicData?.publicUrl || null;

    // 3) inserir registro na tabela 'fotos'
    const { data, error: insertError } = await supabase
        .from('fotos')
        .insert({
            veiculo_id,
            url,
            ordem,
            criado_em: new Date()
        })
        .select()
        .single();

    if (insertError) {
        // opcional: tentar deletar o arquivo do storage se a inserção falhar
        await supabase.storage.from(bucket).remove([path]).catch(() => { /* noop */ });
        throw new Error(`Erro ao inserir registro de foto: ${insertError.message}`);
    }

    return data;
};
// ...existing code...
export const deleteFoto = async (foto_id: number) => {
    // 1. Busca a foto para pegar o path
    const { data: foto, error: fetchError } = await supabase
        .from('fotos')
        .select('url')
        .eq('id', foto_id)
        .single();

    if (fetchError || !foto) {
        throw new Error('Foto não encontrada');
    }

    // 2. Extrai o path da URL
    // Exemplo de URL: https://xxx.supabase.co/storage/v1/object/public/veiculos/veiculos/ABC1234/file.jpg
    const urlParts = foto.url.split('/');
    const bucket = 'veiculos';
    const path = urlParts.slice(urlParts.indexOf(bucket) + 1).join('/');

    // 3. Remove do storage
    await supabase.storage.from(bucket).remove([path]);

    // 4. Remove do banco
    const { error: deleteError } = await supabase
        .from('fotos')
        .delete()
        .eq('id', foto_id);

    if (deleteError) {
        throw new Error(`Erro ao deletar foto: ${deleteError.message}`);
    }

    return true;
};

/**
 * Deleta todas as fotos de um veículo
 */
export const deleteFotosByVeiculoId = async (veiculo_id: string) => {
    const fotos = await getFotosByVeiculoId(veiculo_id);
    
    for (const foto of fotos) {
        await deleteFoto(Number(foto.id));
    }
    
    return true;
};