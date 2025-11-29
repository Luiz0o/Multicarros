"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/middleware/tratamentoErro.ts
var tratamentoErro_exports = {};
__export(tratamentoErro_exports, {
  default: () => tratamentoErro_default
});
module.exports = __toCommonJS(tratamentoErro_exports);

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
