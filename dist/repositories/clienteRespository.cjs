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

// src/repositories/clienteRespository.ts
var clienteRespository_exports = {};
__export(clienteRespository_exports, {
  createClienteRepository: () => createClienteRepository,
  deleteClienteRepository: () => deleteClienteRepository,
  getClienteByIdRepository: () => getClienteByIdRepository,
  getClienteRepository: () => getClienteRepository,
  updateClienteRepository: () => updateClienteRepository
});
module.exports = __toCommonJS(clienteRespository_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createClienteRepository,
  deleteClienteRepository,
  getClienteByIdRepository,
  getClienteRepository,
  updateClienteRepository
});
