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

// src/repositories/fotosVeiculoRepository.ts
var fotosVeiculoRepository_exports = {};
__export(fotosVeiculoRepository_exports, {
  uploadAndCreateFoto: () => uploadAndCreateFoto
});
module.exports = __toCommonJS(fotosVeiculoRepository_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  uploadAndCreateFoto
});
