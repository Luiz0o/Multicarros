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

// src/repositories/acessorioRepository.ts
var acessorioRepository_exports = {};
__export(acessorioRepository_exports, {
  createAcessorioRepository: () => createAcessorioRepository,
  deleteAcessorioRepository: () => deleteAcessorioRepository,
  getAcessorioByIdRepository: () => getAcessorioByIdRepository,
  getAcessoriosRepository: () => getAcessoriosRepository,
  updateAcessorioRepository: () => updateAcessorioRepository
});
module.exports = __toCommonJS(acessorioRepository_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createAcessorioRepository,
  deleteAcessorioRepository,
  getAcessorioByIdRepository,
  getAcessoriosRepository,
  updateAcessorioRepository
});
