import * as veiculoRepository from "../repositories/veiculoRepository";
import * as HttpResponse from "../utils/http-helper";
import * as fotosVeiculoRepository from "../repositories/fotosVeiculoRepository";

// Buscar carros do estoque (para exibir na home)
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

// Buscar veículos cadastrados (tabela veiculo)
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
  // Validações básicas
  if (!novoVeiculo) {
    return await HttpResponse.badRequest("Dados do veículo são obrigatórios");
  }

  // Processar marcaModelo se vier combinado do formulário
  if (novoVeiculo.marcaModelo && !novoVeiculo.marca) {
    const partes = novoVeiculo.marcaModelo.split(" ");
    novoVeiculo.marca = partes[0];
    novoVeiculo.modelo = partes.slice(1).join(" ") || partes[0];
  }

  const veiculoParaSalvar: any = {
    placa: novoVeiculo.placa?.toUpperCase(),
    marca: novoVeiculo.marca,
    fabricacao:
      parseInt(novoVeiculo.fabricacao) ||
      parseInt(novoVeiculo.anoFabricacao) ||
      new Date().getFullYear(),
    modelo: novoVeiculo.modelo,
    cor: novoVeiculo.cor || null,
    combustivel: novoVeiculo.combustivel || null,
    km: novoVeiculo.km ? parseFloat(novoVeiculo.km) : null,
    status: ["usado", "novo"].includes(
      (novoVeiculo.status || "usado").toLowerCase()
    )
      ? novoVeiculo.status.toLowerCase()
      : "usado",
    tipo: ["carro", "moto"].includes(
      (novoVeiculo.tipo || "carro").toLowerCase()
    )
      ? novoVeiculo.tipo.toLowerCase()
      : novoVeiculo.especie === "Motocicleta"
      ? "moto"
      : "carro",
    portas: novoVeiculo.portas ? parseInt(novoVeiculo.portas) : null,
    renavam: novoVeiculo.renavam,
    chassi: novoVeiculo.chassi,
    ano_modelo: novoVeiculo.ano_modelo
      ? parseInt(novoVeiculo.ano_modelo)
      : novoVeiculo.anoModelo
      ? parseInt(novoVeiculo.anoModelo)
      : null,
    preco: novoVeiculo.preco ? parseFloat(novoVeiculo.preco) : 0,
    cambio: ["manual", "automatico"].includes(
      (novoVeiculo.cambio || "manual").toLowerCase()
    )
      ? novoVeiculo.cambio.toLowerCase()
      : "manual",
    posicao: novoVeiculo.posicao !== undefined ? !!novoVeiculo.posicao : true,
    numero_motor: novoVeiculo.numero_motor || null,
    numero_cambio: novoVeiculo.numero_cambio || null,
    data_cadastro: novoVeiculo.data_cadastro || null,
    descricao: novoVeiculo.descricao || null,
  };
  console.log("📋 Dados que serão enviados ao banco:", veiculoParaSalvar);

  // Validação dos campos obrigatórios
  const obrigatorios = [
    "placa",
    "marca",
    "fabricacao",
    "modelo",
    "status",
    "tipo",
    "renavam",
    "chassi",
    "preco",
  ];
  for (const campo of obrigatorios) {
    if (!veiculoParaSalvar[campo] && veiculoParaSalvar[campo] !== 0) {
      return await HttpResponse.badRequest(
        `Campo obrigatório ausente: ${campo}`
      );
    }
  }

  try {
    const created = await veiculoRepository.createVeiculo(veiculoParaSalvar);
    return await HttpResponse.ok(created);
  } catch (error) {
    console.error("Erro ao cadastrar veículo:", error);
    return await HttpResponse.badRequest(
      error instanceof Error ? error.message : "Erro ao cadastrar veículo"
    );
  }
};

export const updateVeiculo = async (placa: string, veiculoAtualizado: any) => {
  const data = await veiculoRepository.atualizarVeiculo(
    placa,
    veiculoAtualizado
  );
  const response = await HttpResponse.ok(data);
  return response;
};

export const deleteVeiculo = async (placa: string) => {
  if (placa) {
    await veiculoRepository.deleteVeiculo(placa);
    return await HttpResponse.ok({message: "Veículo deletado com sucesso"});
  }
};
