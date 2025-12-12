import * as usuarioRepository from "../repositories/usuarioRepository";
import * as HttpResponse from "../utils/http-helper";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || "multicarros_secret_key_2025";
const JWT_EXPIRES_IN = "7d";

export const login = async (email: string, senha: string) => {
  try {
    // Buscar usuário por email
    const usuario = await usuarioRepository.getUsuarioByEmail(email);

    if (!usuario) {
      return await HttpResponse.badRequest("Usuário ou senha inválidos");
    }

    // Verificar senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return await HttpResponse.badRequest("Usuário ou senha inválidos");
    }

    // Gerar token JWT
    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        nome: usuario.nome,
        tipo: usuario.tipo,
      },
      JWT_SECRET,
      {expiresIn: JWT_EXPIRES_IN}
    );

    // Retornar dados do usuário sem a senha
    const {senha: _, ...usuarioSemSenha} = usuario;

    return await HttpResponse.ok({
      success: true,
      message: "Login realizado com sucesso",
      token,
      usuario: usuarioSemSenha,
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return await HttpResponse.badRequest("Erro ao fazer login");
  }
};

export const register = async (userData: any) => {
  try {
    // ✅ VALIDAÇÕES DE CAMPOS OBRIGATÓRIOS
    const camposObrigatorios = ['nome', 'email', 'senha', 'telefone', 'cpf', 'data_nascimento'];
    for (const campo of camposObrigatorios) {
      if (!userData[campo]) {
        return await HttpResponse.badRequest(`Campo "${campo}" é obrigatório`);
      }
    }

    // ✅ VALIDAÇÃO DE EMAIL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      return await HttpResponse.badRequest('Email inválido');
    }

    // ✅ VALIDAÇÃO DE SENHA
    if (userData.senha.length < 6) {
      return await HttpResponse.badRequest('Senha deve ter no mínimo 6 caracteres');
    }

    // Verificar se o email já existe
    const usuarioExistente = await usuarioRepository.getUsuarioByEmail(userData.email);
    if (usuarioExistente) {
      return await HttpResponse.badRequest("Email já cadastrado");
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(userData.senha, 10);

    // Criar usuário
    const novoUsuario = {
      ...userData,
      senha: senhaHash,
      tipo: userData.tipo || 3, // 3 = Cliente por padrão
    };

    const usuario = await usuarioRepository.createUsuario(novoUsuario);

    // Gerar token
    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        nome: usuario.nome,
        tipo: usuario.tipo,
      },
      JWT_SECRET,
      {expiresIn: JWT_EXPIRES_IN}
    );

    // Retornar sem a senha
    const {senha: _, ...usuarioSemSenha} = usuario;

    return await HttpResponse.created({
      success: true,
      message: "Usuário cadastrado com sucesso",
      token,
      usuario: usuarioSemSenha,
    });
  } catch (error: any) {
    console.error("Erro no registro:", error);
    
    // Tratamento específico de erros do banco
    if (error.message?.includes('Email já cadastrado')) {
      return await HttpResponse.badRequest('Email já cadastrado no sistema');
    }
    
    return await HttpResponse.badRequest(error.message || "Erro ao cadastrar usuário");
  }
};

export const verifyToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    // Buscar usuário atualizado
    const usuario = await usuarioRepository.getUsuarioById(decoded.id);

    if (!usuario) {
      return await HttpResponse.unauthorized("Usuário não encontrado");
    }

    const {senha: _, ...usuarioSemSenha} = usuario;

    return await HttpResponse.ok({
      success: true,
      usuario: usuarioSemSenha,
    });
  } catch (error) {
    return await HttpResponse.unauthorized("Token inválido ou expirado");
  }
};
