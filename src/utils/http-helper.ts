import {HttpResponse} from "../models/httpResponseModel";

// http-helper.ts
export const ok = async (data: any): Promise<HttpResponse> => ({
  statusCode: 200,
  body: data,
});

export const created = async (data?: any): Promise<HttpResponse> => ({
  statusCode: 201,
  body: data || {message: "Recurso criado com sucesso"},
});

export const noContent = async (): Promise<HttpResponse> => ({
  statusCode: 204,
  body: null,
});

export const unauthorized = async (
  message: string = "Não autorizado"
): Promise<HttpResponse> => ({
  statusCode: 401,
  body: {
    success: false,
    error: message,
  },
});

export const badRequest = async (
  error: Error | string
): Promise<HttpResponse> => ({
  statusCode: 400,
  body: {
    error: typeof error === "string" ? error : error.message,
  },
});

export const notFound = async (
  message: string = "Recurso não encontrado"
): Promise<HttpResponse> => ({
  statusCode: 404,
  body: {error: message},
});

export const internalServerError = async (
  error: Error | string
): Promise<HttpResponse> => ({
  statusCode: 500,
  body: {
    error: "Erro interno do servidor",
    details: typeof error === "string" ? error : error.message,
  },
});
