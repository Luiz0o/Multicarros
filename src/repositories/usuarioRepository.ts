import {supabase} from "../config/dataBaseConfig";
import HttError from "../utils/HttpsError";
import {Usuario} from "../models/Usuario";

export const getAllUsuarios = async (): Promise<Usuario[]> => {
  const {data: usuarios, error} = await supabase.from("usuarios").select("*");
  if (!usuarios)
    throw new HttError(Number(error.code), "Erro ao buscar usuários");
  return usuarios as Usuario[];
};

export const getUsuarioById = async (id: string): Promise<Usuario | null> => {
  const {data: usuarios, error} = await supabase
    .from("usuarios")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    if (error.code === "PGRST116") {
      return null; // Usuário não encontrado
    }
    throw new HttError(
      Number(error.code),
      `Erro ao buscar usuário: ${error.message}`
    ); // Outro erro ocorreu
  }
  return usuarios as Usuario;
};

export const getUsuarioByEmail = async (
  email: string
): Promise<Usuario | null> => {
  const {data: usuarios, error} = await supabase
    .from("usuarios")
    .select("*")
    .eq("email", email)
    .single();
  if (error) {
    if (error.code === "PGRST116") {
      return null; // Usuário não encontrado
    }
    throw new HttError(
      Number(error.code),
      `Erro ao buscar usuário: ${error.message}`
    );
  }
  return usuarios as Usuario;
};

export const createUsuario = async (novoUsuario: Usuario): Promise<Usuario> => {
  const {data: usuarios, error} = await supabase
    .from("usuarios")
    .insert(novoUsuario)
    .select()
    .single();

  if (error) {
    // Trata erro de duplicação de chave (email já existe)
    if (error.code === "23505") {
      throw new HttError(Number(error.code), "Email já cadastrado no sistema");
    }
    // Trata erro de violação de constraint
    if (error.code === "23514") {
      throw new HttError(
        Number(error.code),
        "Dados inválidos: verifique os campos obrigatórios"
      );
    }
    // Erro genérico
    throw new HttError(
      Number(error.code),
      `Erro ao criar usuário: ${error.message}`
    );
  }

  return usuarios as Usuario;
};

export const atualizarUsuario = async (
  id: string,
  usuarioAtualizado: Partial<Usuario>
) => {
  const {data: usuarios, error} = await supabase
    .from("usuarios")
    .update(usuarioAtualizado)
    .eq("id", id)
    .select()
    .single();
  if (error)
    throw new HttError(
      Number(error.code),
      `Erro ao atualizar usuário: ${error.message}`
    );
  return usuarios as Usuario;
};

export const deletarUsuario = async (id: string): Promise<boolean> => {
  const {error} = await supabase.from("usuarios").delete().eq("id", id);
  if (error)
    throw new HttError(
      Number(error.code),
      `Erro ao deletar usuário: ${error.message}`
    );
  return true;
};
