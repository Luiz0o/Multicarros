"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

// src/services/veiculoServices.ts
var veiculoServices_exports = {};
__export(veiculoServices_exports, {
  createVeiculo: () => createVeiculo2,
  deleteVeiculo: () => deleteVeiculo2,
  getAllVeiculos: () => getAllVeiculos2,
  getVeiculoById: () => getVeiculoById2,
  updateVeiculo: () => updateVeiculo
});
module.exports = __toCommonJS(veiculoServices_exports);

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

// src/repositories/fotosVeiculoRepository.ts
var uploadAndCreateFoto = (veiculo_id, buffer, path, contentType, ordem) => __async(null, null, function* () {
  const bucket = "veiculos";
  const { error: uploadError } = yield supabase.storage.from(bucket).upload(path, buffer, {
    contentType,
    upsert: false
  });
  if (uploadError) {
    throw new Error(`Erro ao subir imagem para storage: ${uploadError.message}`);
  }
  const { data: publicData } = yield supabase.storage.from(bucket).getPublicUrl(path);
  const url = (publicData == null ? void 0 : publicData.publicUrl) || null;
  const { data, error: insertError } = yield supabase.from("fotos").insert({
    veiculo_id,
    url,
    ordem,
    criado_em: /* @__PURE__ */ new Date()
  }).select().single();
  if (insertError) {
    yield supabase.storage.from(bucket).remove([path]).catch(() => {
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
    const created = yield createVeiculo(novoVeiculo);
    const fotosCadastradas = [];
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        const ext = (f.mimetype.split("/")[1] || "jpg").split("+")[0];
        const path = `veiculos/${created.id}/${Date.now()}-${i}.${ext}`;
        const foto = yield uploadAndCreateFoto(Number(created.id), f.buffer, path, f.mimetype, i + 1);
        fotosCadastradas.push(foto);
      }
    }
    return { veiculo: created, fotos: fotosCadastradas };
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createVeiculo,
  deleteVeiculo,
  getAllVeiculos,
  getVeiculoById,
  updateVeiculo
});
