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

// src/repositories/usuarioRepository.ts
var usuarioRepository_exports = {};
__export(usuarioRepository_exports, {
  atualizarUsuario: () => atualizarUsuario,
  createUsuario: () => createUsuario,
  deletarUsuario: () => deletarUsuario,
  getAllUsuarios: () => getAllUsuarios,
  getUsuarioById: () => getUsuarioById
});
module.exports = __toCommonJS(usuarioRepository_exports);

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
var deletarUsuario = (id) => __async(null, null, function* () {
  const { error } = yield supabase.from("usuarios").delete().eq("id", id);
  if (error) throw new HttpsError(Number(error.code), `Erro ao deletar usu\xE1rio: ${error.message}`);
  return true;
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  atualizarUsuario,
  createUsuario,
  deletarUsuario,
  getAllUsuarios,
  getUsuarioById
});
