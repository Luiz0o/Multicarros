import * as veiculoRepository from "../repositories/veiculoRepository";
import * as HttpResponse from "../utils/http-helper";
import * as fotosVeiculoRepository from "../repositories/fotosVeiculoRepository";

// ========================================
// FUNÇÕES AUXILIARES PARA VALIDAÇÃO SEGURA
// ========================================

/**
 * Normaliza string para lowercase de forma segura
 */
const toLowerSafe = (value: any): string => {
  if (!value) return '';
  return String(value).trim().toLowerCase();
};

/**
 * Converte para número de forma segura
 */
const toNumberSafe = (value: any): number | null => {
  if (value === null || value === undefined || value === '') return null;
  const num = Number(value);
  return isNaN(num) ? null : num;
};

/**
 * Converte para inteiro de forma segura
 */
const toIntSafe = (value: any): number | null => {
  const num = toNumberSafe(value);
  return num !== null ? Math.floor(num) : null;
};

// ========================================
// SERVICES
// ========================================

export const getCarrosEstoque = async () => {
  const data = await veiculoRepository.getAllCarrosEstoque();
  let response = null;

  if (data) {
    response = await HttpResponse.ok(data);
  } else {
    response = await HttpResponse.noContent();
  }
  return response;
};

export const getAllVeiculos = async () => {
  const data = await veiculoRepository.getAllVeiculos();
  let response = null;

  if (data) {
    response = await HttpResponse.ok(data);
  } else {
    response = await HttpResponse.noContent();
  }
  return response;
};

export const getVeiculoById = async (id: string) => {
  const veiculo = await veiculoRepository.getVeiculoById(id);
  let response = null;

  if (veiculo) {
    response = await HttpResponse.ok(veiculo);
  } else {
    response = await HttpResponse.noContent();
  }

  return response;
};

export const createVeiculo = async (
  novoVeiculo: any,
  files?: Express.Multer.File[]
) => {
  console.log("🔍 Iniciando criação de veículo...");
  console.log("📦 Dados recebidos:", JSON.stringify(novoVeiculo, null, 2));
  console.log(`📸 Arquivos recebidos: ${files?.length || 0}`);

  // ========================================
  // 1️⃣ VALIDAÇÕES BÁSICAS
  // ========================================
  if (!novoVeiculo) {
    return await HttpResponse.badRequest("Dados do veículo são obrigatórios");
  }

  // ========================================
  // 2️⃣ PROCESSAR MARCA E MODELO
  // ========================================
  let marca = novoVeiculo.marca || '';
  let modelo = novoVeiculo.modelo || '';

  if (novoVeiculo.marcaModelo && !marca) {
    const partes = String(novoVeiculo.marcaModelo).trim().split(" ");
    marca = partes[0] || '';
    modelo = partes.slice(1).join(" ") || partes[0] || '';
  }

  // ========================================
  // 3️⃣ PROCESSAR CAMPOS COM VALIDAÇÃO SEGURA
  // ========================================
  
  const statusRaw = toLowerSafe(novoVeiculo.status);
  const status = ["usado", "novo"].includes(statusRaw) ? statusRaw : "usado";

  let tipo = toLowerSafe(novoVeiculo.tipo);
  if (!["carro", "moto"].includes(tipo)) {
    const especieRaw = toLowerSafe(novoVeiculo.especie);
    tipo = especieRaw.includes("motocicleta") || especieRaw.includes("moto") 
      ? "moto" 
      : "carro";
  }

  const cambioRaw = toLowerSafe(novoVeiculo.cambio);
  const cambio = ["manual", "automatico"].includes(cambioRaw) 
    ? cambioRaw 
    : "manual";

  const combustivelRaw = toLowerSafe(novoVeiculo.combustivel);
  const combustivel = combustivelRaw || null;

  const anoAtual = new Date().getFullYear();
  const fabricacao = toIntSafe(novoVeiculo.fabricacao) 
    || toIntSafe(novoVeiculo.anoFabricacao) 
    || anoAtual;
  
  const ano_modelo = toIntSafe(novoVeiculo.ano_modelo) 
    || toIntSafe(novoVeiculo.anoModelo) 
    || null;

  const preco = toNumberSafe(novoVeiculo.preco) || 0;
  const km = toNumberSafe(novoVeiculo.km);
  const portas = toIntSafe(novoVeiculo.portas);

  const placa = String(novoVeiculo.placa || '').toUpperCase().trim();
  const cor = String(novoVeiculo.cor || '').trim() || null;
  const renavam = String(novoVeiculo.renavam || '').trim();
  const chassi = String(novoVeiculo.chassi || '').trim();
  const numero_motor = String(novoVeiculo.numero_motor || '').trim() || null;
  const numero_cambio = String(novoVeiculo.numero_cambio || '').trim() || null;
  const descricao = String(novoVeiculo.descricao || '').trim() || null;
  const posicao = novoVeiculo.posicao !== undefined ? !!novoVeiculo.posicao : true;

  // ========================================
  // 4️⃣ MONTAR OBJETO PARA SALVAR
  // ========================================
  //crie o objeito do modelo de veiculos
    
  const veiculoParaSalvar: any = {
    placa,
    marca,
    fabricacao,
    modelo,
    cor,
    combustivel,
    km,
    status,
    tipo,
    portas,
    renavam,
    chassi,
    ano_modelo,
    preco,
    cambio,
    posicao,
    numero_motor,
    numero_cambio,
    data_cadastro: new Date(),
    descricao,
  };

  console.log("📋 Dados processados:", JSON.stringify(veiculoParaSalvar, null, 2));

  // ========================================
  // 5️⃣ VALIDAR CAMPOS OBRIGATÓRIOS
  // ========================================
  const camposObrigatorios = {
    placa: "Placa",
    marca: "Marca",
    fabricacao: "Ano de fabricação",
    modelo: "Modelo",
    status: "Status",
    tipo: "Tipo",
    renavam: "RENAVAM",
    chassi: "Chassi",
    preco: "Preço",
  };

  for (const [campo, nome] of Object.entries(camposObrigatorios)) {
    const valor = veiculoParaSalvar[campo];
    if (valor === null || valor === undefined || valor === '') {
      return await HttpResponse.badRequest(
        `Campo obrigatório ausente: ${nome} (${campo})`
      );
    }
  }

  // ========================================
  // 6️⃣ VALIDAÇÕES ESPECÍFICAS
  // ========================================

  const placaRegex = /^[A-Z]{3}[0-9]{4}$|^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
  if (!placaRegex.test(placa)) {
    return await HttpResponse.badRequest(
      `Placa inválida: "${placa}". Use formato ABC1234 ou ABC1D23`
    );
  }

  if (chassi.length !== 17) {
    return await HttpResponse.badRequest(
      `Chassi inválido: deve ter 17 caracteres (recebido: ${chassi.length})`
    );
  }

  if (!/^\d{11}$/.test(renavam)) {
    return await HttpResponse.badRequest(
      `RENAVAM inválido: deve ter 11 dígitos numéricos (recebido: "${renavam}")`
    );
  }

  if (fabricacao < 1900 || fabricacao > anoAtual + 1) {
    return await HttpResponse.badRequest(
      `Ano de fabricação inválido: ${fabricacao} (deve estar entre 1900 e ${anoAtual + 1})`
    );
  }

  if (preco < 0) {
    return await HttpResponse.badRequest("Preço não pode ser negativo");
  }

  if (km !== null && km < 0) {
    return await HttpResponse.badRequest("Quilometragem não pode ser negativa");
  }

  try {
    // ========================================
    // 7️⃣ SALVAR O VEÍCULO NO BANCO
    // ========================================
    console.log("🔍 DIAGNÓSTICO DO CAMPO PORTAS:");
    console.log("  - Valor recebido do frontend:", novoVeiculo.portas);
    console.log("  - Valor processado:", portas);
    console.log("  - Objeto completo que será salvo:", JSON.stringify(veiculoParaSalvar, null, 2));
    console.log("💾 Salvando veículo no banco...");
    const veiculoCriado = await veiculoRepository.createVeiculo(veiculoParaSalvar);
    console.log("✅ Veículo criado com ID:", veiculoCriado.id);

    // ========================================
    // 8️⃣ PROCESSAR FOTOS (SE HOUVER)
    // ========================================
    if (!files || files.length === 0) {
      console.log("ℹ️ Nenhuma foto foi enviada");
      return await HttpResponse.ok({
        veiculo: veiculoCriado,
        fotos: {
          total_enviadas: 0,
          sucesso: 0,
          falhas: 0,
          lista_sucesso: [],
          lista_erros: null
        },
        message: "Veículo cadastrado com sucesso! (sem fotos)"
      });
    }

    console.log(`📸 Iniciando upload de ${files.length} foto(s)...`);

    if (!veiculoCriado.id) {
      console.error("❌ Veículo criado sem ID numérico!");
      return await HttpResponse.badRequest(
        "Erro: Veículo criado mas sem ID. Não é possível vincular fotos."
      );
    }

    const fotosUpload = [];
    const fotosErro = [];

    // ========================================
    // 9️⃣ FAZER UPLOAD DE CADA FOTO
    // ========================================
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      try {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        if (!allowedMimes.includes(file.mimetype)) {
          fotosErro.push({
            index: i + 1,
            nome: file.originalname,
            erro: `Formato inválido (${file.mimetype}). Use JPEG, PNG ou WebP`
          });
          console.warn(`⚠️ Foto ${i + 1} rejeitada: formato inválido`);
          continue;
        }

        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
          fotosErro.push({
            index: i + 1,
            nome: file.originalname,
            erro: `Arquivo muito grande (${(file.size / 1024 / 1024).toFixed(2)}MB). Máximo: 10MB`
          });
          console.warn(`⚠️ Foto ${i + 1} rejeitada: muito grande`);
          continue;
        }

        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(7);
        const extensao = file.mimetype.split('/')[1] || 'jpg';
        const fileName = `${placa}_${i + 1}_${timestamp}_${random}.${extensao}`;
        const path = `veiculos/${placa}/${fileName}`;
        
        console.log(`📤 Uploading foto ${i + 1}/${files.length}: ${fileName}`);

        const fotoRecord = await fotosVeiculoRepository.uploadAndCreateFoto(
          String(veiculoCriado.id),
          file.buffer,
          path,
          file.mimetype,
          i + 1
        );
        
        fotosUpload.push(fotoRecord);
        console.log(`✅ Foto ${i + 1}/${files.length} salva`);
        
      } catch (fotoError) {
        console.error(`❌ Erro ao processar foto ${i + 1}:`, fotoError);
        fotosErro.push({
          index: i + 1,
          nome: file.originalname,
          erro: fotoError instanceof Error ? fotoError.message : 'Erro desconhecido'
        });
      }
    }

    // ========================================
    // 🔟 MONTAR RESPOSTA FINAL
    // ========================================
    console.log(`✅ Upload concluído: ${fotosUpload.length}/${files.length} foto(s)`);

    const resposta = {
      veiculo: veiculoCriado,
      fotos: {
        total_enviadas: files.length,
        sucesso: fotosUpload.length,
        falhas: fotosErro.length,
        lista_sucesso: fotosUpload,
        lista_erros: fotosErro.length > 0 ? fotosErro : null
      },
      message: fotosErro.length === 0
        ? `Veículo cadastrado com sucesso! ${fotosUpload.length} foto(s) enviada(s).`
        : `Veículo cadastrado! ${fotosUpload.length} foto(s) enviada(s), ${fotosErro.length} falharam.`
    };

    return await HttpResponse.ok(resposta);

  } catch (error) {
    console.error("❌ Erro ao cadastrar veículo:", error);
    return await HttpResponse.badRequest(
      error instanceof Error ? error.message : "Erro ao cadastrar veículo"
    );
  }
};

export const updateVeiculo = async (id: string, veiculoAtualizado: any) => {
  const data = await veiculoRepository.atualizarVeiculo(
    id,
    veiculoAtualizado
  );
  const response = await HttpResponse.ok(data);
  return response;
};

export const deleteVeiculo = async (id: string) => {
  if (id) {
    await veiculoRepository.deleteVeiculo(id);
    return await HttpResponse.ok({message: "Veículo deletado com sucesso"});
  }
};

export const getAllVeiculosComFotos = async () => {
  try {
    const data = await veiculoRepository.getAllVeiculosComFotos();
    
    if (!data || data.length === 0) {
      return await HttpResponse.noContent();
    }

    const veiculosFormatados = data.map((veiculo: any) => ({
      ...veiculo,
      fotos: veiculo.fotos || [],
      foto_principal: veiculo.fotos?.[0]?.url || null,
      total_fotos: veiculo.fotos?.length || 0
    }));

    return await HttpResponse.ok(veiculosFormatados);
  } catch (error) {
    console.error("Erro ao buscar veículos com fotos:", error);
    throw error;
  }
};

/**
 * ✅ Busca veículo por ID com suas fotos
 * @param id - ID do veículo (string/UUID)
 */
export const getVeiculoByIdComFotos = async (id: string) => {
  try {
    console.log(`🔍 Service: Buscando veículo ID: ${id}`);
    
    // ✅ Validação de entrada
    if (!id || id.trim() === "") {
      console.error("❌ ID inválido ou vazio");
      return await HttpResponse.badRequest("ID do veículo é obrigatório");
    }

    // ✅ Busca no repositório
    const veiculo = await veiculoRepository.getVeiculoByIdComFotos(id);
    
    // ✅ Verifica se encontrou
    if (!veiculo) {
      console.warn(`⚠️ Veículo não encontrado: ${id}`);
      return await HttpResponse.noContent();
    }

    console.log(`✅ Veículo encontrado: ${veiculo.marca} ${veiculo.modelo}`);

    // ✅ Formata resposta com informações das fotos
    const veiculoFormatado = {
      ...veiculo,
      fotos: veiculo.fotos || [],
      foto_principal: veiculo.fotos?.[0]?.url || null,
      total_fotos: veiculo.fotos?.length || 0
    };

    return await HttpResponse.ok(veiculoFormatado);
    
  } catch (error) {
    console.error("❌ Erro no service ao buscar veículo:", error);
    throw error; // Propaga erro para o controller tratar
  }
};