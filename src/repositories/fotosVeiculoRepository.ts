import {supabase} from "../config/dataBaseConfig";
import HttError from "../utils/HttpsError";
import {Foto} from "../models/Foto";
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
    veiculo_id: number,
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
