import {supabase} from "../config/dataBaseConfig";
import {Funcionario} from "../models/Funcionario";

export const getAllFuncionarioesRepository = async (): Promise<
  Funcionario[]
> => {
  const {data, error} = await supabase.from("funcionarios").select("*");
  if (error) throw error;
  return data as Funcionario[];
};

export const getFuncionarioByIdRepository = async (
  id: number
): Promise<Funcionario | null> => {
  const {data, error} = await supabase
    .from("funcionarios")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    if (error.code === "PGRST116") {
      return null; // Funcionario não encontrado
    }
    throw error; // Outro erro ocorreu
  }
  return data as Funcionario;
};

export const createFuncionarioRepository = async (
  novoFuncionario: Funcionario
): Promise<Funcionario> => {
  const {data, error} = await supabase
    .from("funcionarios")
    .insert(novoFuncionario)
    .select()
    .single();
  if (error) throw error;
  return data as Funcionario;
};

export const updateFuncionarioRepository = async (
  id: number,
  FuncionarioAtualizado: Funcionario
): Promise<Funcionario | null> => {
  const {data, error} = await supabase
    .from("funcionarios")
    .update(FuncionarioAtualizado)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Funcionario;
};

export const deleteFuncionarioRepository = async (
  id: number
): Promise<boolean> => {
  const {error} = await supabase.from("funcionarios").delete().eq("id", id);
  if (error) {
    if (error.code === "PGRST116") {
      return false; // Funcionario não encontrado
    }
    throw error; // Outro erro ocorreu
  }
  return true;
};
