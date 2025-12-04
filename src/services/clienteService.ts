import {Cliente} from "../models/Cliente";
import * as clienteRepository from "../repositories/clienteRespository";
import * as HttpResponse from "../utils/http-helper";

export const getClientesService = async () => {
  const data = await clienteRepository.getClienteRepository();
  let response = null;

  if (data) {
    response = await HttpResponse.ok(data);
  } else {
    response = await HttpResponse.noContent();
  }
  return response;
};

export const getClienteByIdService = async (cpf: string) => {
  const data = await clienteRepository.getClienteByIdRepository(cpf);
  let response = null;

  if (data) {
    response = await HttpResponse.ok(data);
  } else {
    response = await HttpResponse.noContent();
  }
  return response;
};

export const createClienteService = async (cliente: Cliente) => {
  if (cliente) {
    // Processar data de nascimento se vier no formato do formulário
    if (cliente.nascimento && !cliente.data_nascimento) {
      cliente.data_nascimento = new Date(cliente.nascimento);
    }

    await clienteRepository.createClienteRepository(cliente);
    return await HttpResponse.created();
  } else {
    return await HttpResponse.badRequest(new Error("Cliente inválido"));
  }
};

export const updateClienteService = async (
  cpf: string,
  clienteAtualizado: Cliente
) => {
  const data = await clienteRepository.updateClienteRepository(
    cpf,
    clienteAtualizado
  );
  const response = await HttpResponse.ok(data);
  return response;
};

export const deleteClienteService = async (cpf: string) => {
  if (cpf) {
    await clienteRepository.deleteClienteRepository(cpf);
    return await HttpResponse.ok({message: "Cliente deletado com sucesso"});
  }
};
