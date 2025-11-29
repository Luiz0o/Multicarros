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

// src/controllers/usuarioController.ts
var usuarioController_exports = {};
__export(usuarioController_exports, {
  createUsuario: () => createUsuario3,
  deleteUsuario: () => deleteUsuario2,
  getAllUsuarios: () => getAllUsuarios3,
  getUsuarioById: () => getUsuarioById3,
  updateUsuario: () => updateUsuario2
});
module.exports = __toCommonJS(usuarioController_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createUsuario,
  deleteUsuario,
  getAllUsuarios,
  getUsuarioById,
  updateUsuario
});
