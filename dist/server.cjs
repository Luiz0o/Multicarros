"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/app.ts
var import_express7 = __toESM(require("express"), 1);

// src/routes/index.ts
var import_express6 = __toESM(require("express"), 1);

// src/routes/veiculoRoutes.ts
var import_express = __toESM(require("express"), 1);

// src/utils/HttpsError.ts
var HttpsError = class extends Error {
  constructor(statusCode, message, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
};

// src/config/dataBaseConfig.ts
var import_supabase_js = require("@supabase/supabase-js");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var supabaseUrl = process.env.SUPABASE_URL || "";
var supabaseKey = process.env.SUPABASE_KEY || "";
var supabase = (0, import_supabase_js.createClient)(supabaseUrl, supabaseKey);
(() => __async(null, null, function* () {
  const { error } = yield supabase.from("veiculos").select("placa").limit(1);
  if (!error) {
    console.log("Conex\xE3o com o banco Supabase estabelecida com sucesso!");
  } else {
    console.error("Erro ao conectar ao banco Supabase:", error.message);
  }
}))();

// src/repositories/veiculoRepository.ts
var getAllVeiculos = () => __async(null, null, function* () {
  const { data: veiculos, error } = yield supabase.from("veiculos").select("*");
  if (!veiculos) throw new HttpsError(Number(error.code), "Erro ao buscar ve\xEDculos");
  return veiculos;
});
var getVeiculoById = (id) => __async(null, null, function* () {
  const { data: veiculos, error } = yield supabase.from("veiculos").select("*").eq("id", id).single();
  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    throw new HttpsError(Number(error.code), `Erro ao buscar ve\xEDculo: ${error.message}`);
  }
  return veiculos;
});
var createVeiculo = (novoVeiculo) => __async(null, null, function* () {
  const { data: veiculos, error } = yield supabase.from("veiculos").insert(novoVeiculo).select().single();
  if (error) {
    if (error.code === "23505") {
      throw new HttpsError(Number(error.code), "Placa j\xE1 cadastrada no sistema");
    }
    if (error.code === "23514") {
      throw new HttpsError(Number(error.code), "Dados inv\xE1lidos: verifique os campos obrigat\xF3rios");
    }
    throw new HttpsError(Number(error.code), `Erro ao criar ve\xEDculo: ${error.message}`);
  }
  return veiculos;
});
var atualizarVeiculo = (id, veiculoAtualizado) => __async(null, null, function* () {
  const { data: veiculos, error } = yield supabase.from("veiculos").update(veiculoAtualizado).eq("id", id).select().single();
  if (error) throw new HttpsError(Number(error.code), `Erro ao atualizar ve\xEDculo: ${error.message}`);
  return veiculos;
});
var deleteVeiculo = (id) => __async(null, null, function* () {
  const { error } = yield supabase.from("veiculos").delete().eq("id", id);
  if (error) {
    if (error.code === "PGRST116") {
      return false;
    }
    throw error;
  }
  return true;
});

// src/utils/http-helper.ts
var ok = (data) => __async(null, null, function* () {
  return {
    statusCode: 200,
    body: data
  };
});
var created = () => __async(null, null, function* () {
  return {
    statusCode: 201,
    body: { message: "Recurso criado com sucesso" }
  };
});
var noContent = () => __async(null, null, function* () {
  return {
    statusCode: 204,
    body: null
  };
});
var badRequest = (error) => __async(null, null, function* () {
  return {
    statusCode: 400,
    body: {
      error: typeof error === "string" ? error : error.message
    }
  };
});
var internalServerError = (error) => __async(null, null, function* () {
  return {
    statusCode: 500,
    body: {
      error: "Erro interno do servidor",
      details: typeof error === "string" ? error : error.message
    }
  };
});

// src/repositories/fotosVeiculoRepository.ts
var uploadAndCreateFoto = (veiculo_id, buffer, path2, contentType, ordem) => __async(null, null, function* () {
  const bucket = "veiculos";
  const { error: uploadError } = yield supabase.storage.from(bucket).upload(path2, buffer, {
    contentType,
    upsert: false
  });
  if (uploadError) {
    throw new Error(`Erro ao subir imagem para storage: ${uploadError.message}`);
  }
  const { data: publicData } = yield supabase.storage.from(bucket).getPublicUrl(path2);
  const url = (publicData == null ? void 0 : publicData.publicUrl) || null;
  const { data, error: insertError } = yield supabase.from("fotos").insert({
    veiculo_id,
    url,
    ordem,
    criado_em: /* @__PURE__ */ new Date()
  }).select().single();
  if (insertError) {
    yield supabase.storage.from(bucket).remove([path2]).catch(() => {
    });
    throw new Error(`Erro ao inserir registro de foto: ${insertError.message}`);
  }
  return data;
});

// src/services/veiculoServices.ts
var getAllVeiculos2 = () => __async(null, null, function* () {
  const data = yield getAllVeiculos();
  let response = null;
  if (data) {
    response = yield ok(data);
  } else {
    response = yield noContent();
  }
  return response;
});
var getVeiculoById2 = (id) => __async(null, null, function* () {
  const veiculo = yield getVeiculoById(id);
  let response = null;
  if (veiculo) {
    response = yield ok(veiculo);
  } else {
    response = yield noContent();
  }
  return response;
});
var createVeiculo2 = (novoVeiculo, files) => __async(null, null, function* () {
  try {
    if (!novoVeiculo) {
      return yield badRequest("Dados do ve\xEDculo s\xE3o obrigat\xF3rios");
    }
    const camposObrigatorios = ["placa", "tipo", "marca", "modelo", "preco"];
    for (const campo of camposObrigatorios) {
      if (!novoVeiculo[campo]) {
        return yield badRequest(`Campo "${campo}" \xE9 obrigat\xF3rio`);
      }
    }
    const placaRegex = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;
    if (!placaRegex.test(novoVeiculo.placa.toUpperCase())) {
      return yield badRequest("Formato de placa inv\xE1lido (ex: ABC1D23)");
    }
    const tiposValidos = ["carro", "moto", "caminhao"];
    if (!tiposValidos.includes(novoVeiculo.tipo)) {
      return yield badRequest("Tipo de ve\xEDculo inv\xE1lido (carro, moto ou caminhao)");
    }
    novoVeiculo.placa = novoVeiculo.placa.toUpperCase();
    const created2 = yield createVeiculo(novoVeiculo);
    const fotosCadastradas = [];
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        const ext = (f.mimetype.split("/")[1] || "jpg").split("+")[0];
        const path2 = `veiculos/${created2.id}/${Date.now()}-${i}.${ext}`;
        const foto = yield uploadAndCreateFoto(Number(created2.id), f.buffer, path2, f.mimetype, i + 1);
        fotosCadastradas.push(foto);
      }
    }
    return { veiculo: created2, fotos: fotosCadastradas };
  } catch (error) {
    console.error("Erro em createVeiculo:", error);
    return yield badRequest(
      error instanceof Error ? error.message : "Erro ao criar ve\xEDculo"
    );
  }
});
var updateVeiculo = (placa, veiculoAtualizado) => __async(null, null, function* () {
  const data = yield atualizarVeiculo(placa, veiculoAtualizado);
  const response = yield ok(data);
  return response;
});
var deleteVeiculo2 = (placa) => __async(null, null, function* () {
  if (placa) {
    yield deleteVeiculo(placa);
    return yield ok({ message: "Ve\xEDculo deletado com sucesso" });
  }
});

// src/controllers/veiculoController.ts
var getAllVeiculos3 = (req, res, next) => __async(null, null, function* () {
  try {
    const response = yield getAllVeiculos2();
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(new HttpsError(500, "Erro ao buscar ve\xEDculos", error));
  }
});
var getVeiculoById3 = (req, res, next) => __async(null, null, function* () {
  try {
    const id = req.params.id;
    const response = yield getVeiculoById2(id);
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(error);
  }
});
var createVeiculo3 = (req, res, next) => __async(null, null, function* () {
  try {
    let isHttpResponse2 = function(obj) {
      return obj && typeof obj.statusCode === "number";
    };
    var isHttpResponse = isHttpResponse2;
    const novoVeiculo = req.body;
    const file = req.file ? [req.file] : [];
    const response = yield createVeiculo2(novoVeiculo, file);
    if (isHttpResponse2(response)) {
      res.status(response.statusCode).json(response.body);
    } else {
      res.status(201).json(response);
    }
  } catch (error) {
    next(new HttpsError(500, "Erro ao criar ve\xEDculo", error));
  }
});
var updateVeiculo2 = (req, res, next) => __async(null, null, function* () {
  try {
    const id = req.params.id;
    const veiculoAtualizado = req.body;
    const response = yield updateVeiculo(id, veiculoAtualizado);
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(new HttpsError(500, "Erro ao atualizar ve\xEDculo", error));
  }
});
var deleteVeiculo3 = (req, res, next) => __async(null, null, function* () {
  try {
    const id = req.params.id;
    const response = yield deleteVeiculo2(id);
    if (response) {
      res.status(response.statusCode).json(response.body);
    } else {
      next(new HttpsError(500, "Resposta inesperada do servi\xE7o"));
    }
  } catch (error) {
    next(new HttpsError(500, "Erro ao deletar ve\xEDculo", error));
  }
});

// src/routes/veiculoRoutes.ts
var import_multer = __toESM(require("multer"), 1);
var router = import_express.default.Router();
var storage = import_multer.default.memoryStorage();
var upload = (0, import_multer.default)({ storage, limits: { fileSize: 20 * 1024 * 1024 } });
router.get("/veiculos", getAllVeiculos3).post("/veiculos", upload.array("foto", 8), createVeiculo3).get("/veiculos/:id", getVeiculoById3).patch("/veiculos/:id", updateVeiculo2).delete("/veiculos/:id", deleteVeiculo3);
var veiculoRoutes_default = router;

// src/routes/clienteRoutes.ts
var import_express2 = __toESM(require("express"), 1);

// src/repositories/clienteRespository.ts
var getClienteRepository = () => __async(null, null, function* () {
  const { data, error } = yield supabase.from("clientes").select("*");
  if (error) throw error;
  return data;
});
var getClienteByIdRepository = (cpf) => __async(null, null, function* () {
  const { data, error } = yield supabase.from("clientes").select("*").eq("cpf", cpf).single();
  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    throw error;
  }
  return data;
});
var createClienteRepository = (cliente) => __async(null, null, function* () {
  const { data, error } = yield supabase.from("clientes").insert(cliente).select().single();
  if (error) throw error;
  return data;
});
var updateClienteRepository = (cpf, clienteAtualizado) => __async(null, null, function* () {
  const { data, error } = yield supabase.from("clientes").update(clienteAtualizado).eq("cpf", cpf).select().single();
  if (error) throw error;
  return data;
});
var deleteClienteRepository = (cpf) => __async(null, null, function* () {
  const { error } = yield supabase.from("clientes").delete().eq("cpf", cpf);
  if (error) {
    if (error.code === "PGRST116") {
      return false;
    }
    throw error;
  }
  return true;
});

// src/services/clienteService.ts
var getClientesService = () => __async(null, null, function* () {
  const data = yield getClienteRepository();
  let response = null;
  if (data) {
    response = yield ok(data);
  } else {
    response = yield noContent();
  }
  return response;
});
var getClienteByIdService = (cpf) => __async(null, null, function* () {
  const data = yield getClienteByIdRepository(cpf);
  let response = null;
  if (data) {
    response = yield ok(data);
  } else {
    response = yield noContent();
  }
  return response;
});
var createClienteService = (cliente) => __async(null, null, function* () {
  if (cliente) {
    yield createClienteRepository(cliente);
    return yield created();
  } else {
    return yield badRequest(new Error("Cliente inv\xE1lido"));
  }
});
var updateClienteService = (cpf, clienteAtualizado) => __async(null, null, function* () {
  const data = yield updateClienteRepository(cpf, clienteAtualizado);
  const response = yield ok(data);
  return response;
});
var deleteClienteService = (cpf) => __async(null, null, function* () {
  if (cpf) {
    yield deleteClienteRepository(cpf);
    return yield ok({ message: "Cliente deletado com sucesso" });
  }
});

// src/controllers/clienteController.ts
var getAllClientes = (req, res) => __async(null, null, function* () {
  const response = yield getClientesService();
  res.status(response.statusCode).json(response.body);
});
var getClienteById = (req, res) => __async(null, null, function* () {
  const cpf = req.params.cpf;
  const response = yield getClienteByIdService(cpf);
  res.status(response.statusCode).json(response.body);
});
var createCliente = (req, res) => __async(null, null, function* () {
  const novoCliente = req.body;
  const response = yield createClienteService(novoCliente);
  if (response) {
    res.status(response.statusCode).json(response.body);
  }
});
var updateCliente = (req, res) => __async(null, null, function* () {
  const cpf = req.params.cpf;
  const clienteAtualizado = req.body;
  const response = yield updateClienteService(cpf, clienteAtualizado);
  res.status(response.statusCode).json(response.body);
});
var deleteCliente = (req, res) => __async(null, null, function* () {
  const cpf = req.params.cpf;
  const response = yield deleteClienteService(cpf);
  if (response) {
    res.status(response.statusCode).json(response.body);
  } else {
    res.status(500).json({ error: "Unexpected error: response is undefined." });
  }
});

// src/routes/clienteRoutes.ts
var router2 = import_express2.default.Router();
router2.get("/usuarios", getAllClientes).get("/clientes/:cpf", getClienteById).post("/usuarios", createCliente).patch("/clientes/:cpf", updateCliente).delete("/clientes/:cpf", deleteCliente);
var clienteRoutes_default = router2;

// src/routes/funcionarioRoutes.ts
var import_express3 = __toESM(require("express"), 1);

// src/repositories/funcionarioRepository.ts
var getAllFuncionarioesRepository = () => __async(null, null, function* () {
  const { data, error } = yield supabase.from("Funcionarioes").select("*");
  if (error) throw error;
  return data;
});
var getFuncionarioByIdRepository = (id) => __async(null, null, function* () {
  const { data, error } = yield supabase.from("Funcionarioes").select("*").eq("id", id).single();
  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    throw error;
  }
  return data;
});
var createFuncionarioRepository = (novoFuncionario) => __async(null, null, function* () {
  const { data, error } = yield supabase.from("Funcionarioes").insert(novoFuncionario).select().single();
  if (error) throw error;
  return data;
});
var updateFuncionarioRepository = (id, FuncionarioAtualizado) => __async(null, null, function* () {
  const { data, error } = yield supabase.from("Funcionarioes").update(FuncionarioAtualizado).eq("id", id).select().single();
  if (error) throw error;
  return data;
});
var deleteFuncionarioRepository = (id) => __async(null, null, function* () {
  const { error } = yield supabase.from("Funcionarioes").delete().eq("id", id);
  if (error) {
    if (error.code === "PGRST116") {
      return false;
    }
    throw error;
  }
  return true;
});

// src/services/funcionarioService.ts
var getAllFuncionarioesService = () => __async(null, null, function* () {
  const data = yield getAllFuncionarioesRepository();
  let response = null;
  if (data) {
    response = yield ok(data);
  } else {
    response = yield noContent();
  }
  return response;
});
var getFuncionarioByIdService = (id) => __async(null, null, function* () {
  const data = yield getFuncionarioByIdRepository(id);
  let response = null;
  if (data) {
    response = yield ok(data);
  } else {
    response = yield noContent();
  }
  return response;
});
var createFuncionarioService = (novoFuncionario) => __async(null, null, function* () {
  let response = null;
  if (novoFuncionario) {
    yield createFuncionarioRepository(novoFuncionario);
    return yield created();
  } else {
    return badRequest(new Error("Dados inv\xE1lidos"));
  }
});
var updateFuncionarioService = (id, FuncionarioAtualizado) => __async(null, null, function* () {
  const data = yield updateFuncionarioRepository(id, FuncionarioAtualizado);
  const response = yield ok(data);
  return response;
});
var deleteFuncionarioService = (id) => __async(null, null, function* () {
  if (id) {
    yield deleteFuncionarioRepository(id);
    return yield ok({ message: "Funcionario deletado com sucesso" });
  }
});

// src/controllers/funcionarioController.ts
var getAllFuncionarioes = (req, res) => __async(null, null, function* () {
  const response = yield getAllFuncionarioesService();
  res.status(response.statusCode).json(response.body);
});
var getFuncionarioById = (req, res) => __async(null, null, function* () {
  const id = req.params.id;
  const response = yield getFuncionarioByIdService(Number(id));
  res.status(response.statusCode).json(response.body);
});
var createFuncionario = (req, res) => __async(null, null, function* () {
  const Funcionario = req.body;
  const response = yield createFuncionarioService(Funcionario);
  if (response) {
    res.status(response.statusCode).json(response.body);
  }
});
var updateFuncionario = (req, res) => __async(null, null, function* () {
  const id = req.params.id;
  const FuncionarioAtualizado = req.body;
  const response = yield updateFuncionarioService(Number(id), FuncionarioAtualizado);
  res.status(response.statusCode).json(response.body);
});
var deleteFuncionario = (req, res) => __async(null, null, function* () {
  const id = req.params.id;
  const response = yield deleteFuncionarioService(Number(id));
  if (response) {
    res.status(response.statusCode).json(response.body);
  } else {
    res.status(500).json({ error: "Unexpected error: response is undefined." });
  }
});

// src/routes/funcionarioRoutes.ts
var router3 = import_express3.default.Router();
router3.get("/funcionarios", getAllFuncionarioes).get("/funcionarios/:id", getFuncionarioById).post("/funcionarios", createFuncionario).patch("/funcionarios/:id", updateFuncionario).delete("/funcionarios/:id", deleteFuncionario);
var funcionarioRoutes_default = router3;

// src/routes/acessorioRoutes.ts
var import_express4 = __toESM(require("express"), 1);

// src/repositories/acessorioRepository.ts
var getAcessoriosRepository = () => __async(null, null, function* () {
  const { data: acessorios, error } = yield supabase.from("acessorios").select("*");
  if (!acessorios) throw new HttpsError(Number(error.code), `Erro ao buscar acess\xF3rios: ${error == null ? void 0 : error.message}`);
  return acessorios;
});
var getAcessorioByIdRepository = (id) => __async(null, null, function* () {
  const { data: acessorio, error } = yield supabase.from("acessorios").select("*").eq("id", id).single();
  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    throw new HttpsError(Number(error.code), `Erro ao buscar acess\xF3rio: ${error.message}`);
  }
  return acessorio;
});
var createAcessorioRepository = (novoAcessorio) => __async(null, null, function* () {
  const { data: acessorio, error } = yield supabase.from("acessorios").insert(novoAcessorio).select().single();
  if (error) throw new HttpsError(Number(error.code), `Erro ao criar acess\xF3rio: ${error.message}`);
  return acessorio;
});
var updateAcessorioRepository = (id, acessorioAtualizado) => __async(null, null, function* () {
  const { data: acessorio, error } = yield supabase.from("acessorios").update(acessorioAtualizado).eq("id", id).select().single();
  if (error) throw new HttpsError(Number(error.code), `Erro ao atualizar acess\xF3rio: ${error.message}`);
  return acessorio;
});
var deleteAcessorioRepository = (id) => __async(null, null, function* () {
  const { error } = yield supabase.from("acessorios").delete().eq("id", id);
  if (error) throw new HttpsError(Number(error.code), `Erro ao deletar acess\xF3rio: ${error.message}`);
});

// src/services/acessorioService.ts
var getAllAcessorios = () => __async(null, null, function* () {
  const data = yield getAcessoriosRepository();
  let response = null;
  if (data) {
    response = yield ok(data);
  } else {
    response = yield noContent();
  }
  return response;
});
var getAcessorioById = (id) => __async(null, null, function* () {
  const acessorio = yield getAcessorioByIdRepository(id);
  let response = null;
  if (acessorio) {
    response = yield ok(acessorio);
  } else {
    response = yield noContent();
  }
  return response;
});
var createAcessorio = (novoAcessorio) => __async(null, null, function* () {
  try {
    if (!novoAcessorio) {
      return yield badRequest("Dados do acess\xF3rio s\xE3o obrigat\xF3rios");
    }
    const camposObrigatorios = ["nome", "descricao", "preco"];
    for (const campo of camposObrigatorios) {
      if (!novoAcessorio[campo]) {
        return yield badRequest(`Campo "${campo}" \xE9 obrigat\xF3rio`);
      }
    }
    yield createAcessorioRepository(novoAcessorio);
    return yield created();
  } catch (error) {
    return yield internalServerError(`Erro ao criar acess\xF3rio: ${error.message}`);
  }
});
var updateAcessorio = (id, acessorioAtualizado) => __async(null, null, function* () {
  try {
    const data = yield updateAcessorioRepository(id, acessorioAtualizado);
    const response = yield ok(data);
    return response;
  } catch (error) {
    return yield internalServerError(`Erro ao atualizar acess\xF3rio: ${error.message}`);
  }
});
var deleteAcessorio = (id) => __async(null, null, function* () {
  try {
    if (id) {
      yield deleteAcessorioRepository(id);
      return yield ok({ message: "Acess\xF3rio deletado com sucesso" });
    }
  } catch (error) {
    return yield internalServerError(`Erro ao deletar acess\xF3rio: ${error.message}`);
  }
});

// src/controllers/acessorioController.ts
var getAllAcessorios2 = (req, res, next) => __async(null, null, function* () {
  try {
    const response = yield getAllAcessorios();
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(new HttpsError(500, "Erro ao buscar acess\xF3rios", error));
  }
});
var getAcessorioById2 = (req, res, next) => __async(null, null, function* () {
  try {
    const id = Number(req.params.id);
    const response = yield getAcessorioById(id);
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(new HttpsError(500, "Erro ao buscar acess\xF3rio por ID", error));
  }
});
var createAcessorio2 = (req, res, next) => __async(null, null, function* () {
  try {
    const novoAcessorio = req.body;
    const response = yield createAcessorio(novoAcessorio);
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(new HttpsError(500, "Erro ao criar acess\xF3rio", error));
  }
});
var updateAcessorio2 = (req, res, next) => __async(null, null, function* () {
  try {
    const id = Number(req.params.id);
    const acessorioAtualizado = req.body;
    const response = yield updateAcessorio(id, acessorioAtualizado);
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(new HttpsError(500, "Erro ao atualizar acess\xF3rio", error));
  }
});
var deleteAcessorio2 = (req, res, next) => __async(null, null, function* () {
  try {
    const id = Number(req.params.id);
    const response = yield deleteAcessorio(id);
    if (response) {
      res.status(response.statusCode).json(response.body);
    } else {
      next(new HttpsError(500, "Resposta inesperada do servi\xE7o"));
    }
  } catch (error) {
    next(new HttpsError(500, "Erro ao deletar acess\xF3rio", error));
  }
});

// src/routes/acessorioRoutes.ts
var router4 = import_express4.default.Router();
router4.get("/acessorios", getAllAcessorios2).get("/acessorios/:id", getAcessorioById2).post("/acessorios", createAcessorio2).patch("/acessorios/:id", updateAcessorio2).delete("/acessorios/:id", deleteAcessorio2);
var acessorioRoutes_default = router4;

// src/routes/usuarioRoutes.ts
var import_express5 = __toESM(require("express"), 1);

// src/repositories/usuarioRepository.ts
var getAllUsuarios = () => __async(null, null, function* () {
  const { data: usuarios, error } = yield supabase.from("usuarios").select("*");
  if (!usuarios) throw new HttpsError(Number(error.code), "Erro ao buscar usu\xE1rios");
  return usuarios;
});
var getUsuarioById = (id) => __async(null, null, function* () {
  const { data: usuarios, error } = yield supabase.from("usuarios").select("*").eq("id", id).single();
  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    throw new HttpsError(Number(error.code), `Erro ao buscar usu\xE1rio: ${error.message}`);
  }
  return usuarios;
});
var createUsuario = (novoUsuario) => __async(null, null, function* () {
  const { data: usuarios, error } = yield supabase.from("usuarios").insert(novoUsuario).select().single();
  if (error) {
    if (error.code === "23505") {
      throw new HttpsError(Number(error.code), "Email j\xE1 cadastrado no sistema");
    }
    if (error.code === "23514") {
      throw new HttpsError(Number(error.code), "Dados inv\xE1lidos: verifique os campos obrigat\xF3rios");
    }
    throw new HttpsError(Number(error.code), `Erro ao criar usu\xE1rio: ${error.message}`);
  }
  return usuarios;
});
var atualizarUsuario = (id, usuarioAtualizado) => __async(null, null, function* () {
  const { data: usuarios, error } = yield supabase.from("usuarios").update(usuarioAtualizado).eq("id", id).select().single();
  if (error) throw new HttpsError(Number(error.code), `Erro ao atualizar usu\xE1rio: ${error.message}`);
  return usuarios;
});

// src/services/usuarioService.ts
var getAllUsuarios2 = () => __async(null, null, function* () {
  const data = yield getAllUsuarios();
  let response = null;
  if (data) {
    response = yield ok(data);
  } else {
    response = yield noContent();
  }
  return response;
});
var getUsuarioById2 = (id) => __async(null, null, function* () {
  const usuario = yield getUsuarioById(id);
  let response = null;
  if (usuario) {
    response = yield ok(usuario);
  } else {
    response = yield noContent();
  }
  return response;
});
var createUsuario2 = (novoUsuario) => __async(null, null, function* () {
  try {
    if (!novoUsuario) {
      return yield badRequest("Dados do usu\xE1rio s\xE3o obrigat\xF3rios");
    }
    const camposObrigatorios = ["nome", "email", "senha"];
    for (const campo of camposObrigatorios) {
      if (!novoUsuario[campo]) {
        return yield badRequest(`Campo "${campo}" \xE9 obrigat\xF3rio`);
      }
    }
    yield createUsuario(novoUsuario);
    return yield created();
  } catch (error) {
    return yield internalServerError(`Erro ao criar usu\xE1rio: ${error.message}`);
  }
});
var updateUsuario = (id, usuarioAtualizado) => __async(null, null, function* () {
  try {
    const data = yield atualizarUsuario(id, usuarioAtualizado);
    const response = yield ok(data);
    return response;
  } catch (error) {
    return yield internalServerError(`Erro ao atualizar usu\xE1rio: ${error.message}`);
  }
});
var deleteUsuario = (id) => __async(null, null, function* () {
  try {
    return yield noContent();
  } catch (error) {
    return yield internalServerError(`Erro ao deletar usu\xE1rio: ${error.message}`);
  }
});

// src/controllers/usuarioController.ts
var getAllUsuarios3 = (req, res, next) => __async(null, null, function* () {
  try {
    const response = yield getAllUsuarios2();
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(new HttpsError(500, "Erro ao buscar usu\xE1rios", error));
  }
});
var getUsuarioById3 = (req, res, next) => __async(null, null, function* () {
  try {
    const id = req.params.id;
    const response = yield getUsuarioById2(id);
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(new HttpsError(500, "Erro ao buscar usu\xE1rio por ID", error));
  }
});
var createUsuario3 = (req, res, next) => __async(null, null, function* () {
  try {
    const novoUsuario = req.body;
    const response = yield createUsuario2(novoUsuario);
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(new HttpsError(500, "Erro ao criar usu\xE1rio", error));
  }
});
var updateUsuario2 = (req, res, next) => __async(null, null, function* () {
  try {
    const id = req.params.id;
    const usuarioAtualizado = req.body;
    const response = yield updateUsuario(id, usuarioAtualizado);
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(new HttpsError(500, "Erro ao atualizar usu\xE1rio", error));
  }
});
var deleteUsuario2 = (req, res, next) => __async(null, null, function* () {
  try {
    const id = req.params.id;
    const response = yield deleteUsuario(id);
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(new HttpsError(500, "Erro ao deletar usu\xE1rio", error));
  }
});

// src/routes/usuarioRoutes.ts
var router5 = import_express5.default.Router();
router5.get("/usuarios", getAllUsuarios3).get("/usuarios/:id", getUsuarioById3).post("/usuarios", createUsuario3).patch("/usuarios/:id", updateUsuario2).delete("/usuarios/:id", deleteUsuario2);
var usuarioRoutes_default = router5;

// src/routes/index.ts
var route = (app2) => {
  app2.route("/").get((req, res) => res.status(200).send({ message: "API Multi Carros" }));
  app2.use(import_express6.default.json());
  app2.use(veiculoRoutes_default);
  app2.use(clienteRoutes_default);
  app2.use(funcionarioRoutes_default);
  app2.use(acessorioRoutes_default);
  app2.use(usuarioRoutes_default);
};
var routes_default = route;

// src/app.ts
var import_cors = __toESM(require("cors"), 1);
var import_path = __toESM(require("path"), 1);

// src/middleware/tratamentoErro.ts
function errorHandler(err, req, res, next) {
  if (err instanceof HttpsError) {
    return res.status(err.statusCode).json(__spreadValues({
      success: false,
      status: err.statusCode,
      message: err.message
    }, err.details ? { details: err.details } : {}));
  }
  const status = (err == null ? void 0 : err.statusCode) || (err == null ? void 0 : err.status) || 500;
  const message = (err == null ? void 0 : err.message) || "Internal Server Error";
  const details = err == null ? void 0 : err.details;
  console.error(`[${(/* @__PURE__ */ new Date()).toISOString()}] Error on ${req.method} ${req.originalUrl}:`, err);
  res.status(status).json(__spreadValues({
    success: false,
    status,
    message
  }, details ? { details } : {}));
}
var tratamentoErro_default = errorHandler;

// src/app.ts
function createApp() {
  const app2 = (0, import_express7.default)();
  app2.use((0, import_cors.default)());
  app2.use(import_express7.default.json());
  app2.use(import_express7.default.urlencoded({ extended: true }));
  const publicDir = import_path.default.join(process.cwd(), "public");
  app2.use("/public", import_express7.default.static(publicDir));
  app2.use("/HTML", import_express7.default.static(import_path.default.join(publicDir, "HTML")));
  app2.use("/css", import_express7.default.static(import_path.default.join(publicDir, "css")));
  app2.use("/js", import_express7.default.static(import_path.default.join(publicDir, "js")));
  app2.use("/images", import_express7.default.static(import_path.default.join(publicDir, "images")));
  app2.get("/", (req, res) => {
    res.sendFile(import_path.default.join(publicDir, "HTML", "index.html"));
  });
  routes_default(app2);
  app2.use(tratamentoErro_default);
  return app2;
}
var app_default = createApp;

// src/server.ts
var app = app_default();
var PORT = process.env.PORT || 3e3;
app.listen(PORT, () => {
  console.log(`\u{1F525}Server running on port ${PORT}`);
});
