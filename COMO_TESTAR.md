# 🎯 COMO TESTAR O PROJETO

## ✅ STATUS ATUAL

### O que está funcionando:

- ✅ Servidor rodando na porta 3000
- ✅ Conexão com Supabase estabelecida
- ✅ **HOME mostrando os 20 carros do estoque!** 🎉
- ✅ Endpoint `/estoque` retornando dados

---

## 🔧 CONFIGURAÇÃO FINAL NECESSÁRIA

### Desative o RLS no Supabase para permitir cadastros:

1. Acesse: https://supabase.com/dashboard/project/bgyutjxwynwyuovuvgsz/editor

2. Para cada tabela abaixo, clique nos 3 pontinhos (...) e **desmarque "Enable RLS"**:
   - ✅ `carro_estoque` (já feito)
   - ⚠️ `veiculo`
   - ⚠️ `clientes`
   - ⚠️ `funcionarios`

---

## 🚀 TESTANDO AS FUNCIONALIDADES

### 1. Visualizar Veículos na Home

```
http://localhost:3000/HTML/index.html
```

**Deve mostrar:** 20 carros cadastrados na tabela `carro_estoque`

---

### 2. Visualizar Estoque

```
http://localhost:3000/HTML/estoque.html
```

**Deve mostrar:** Lista completa de veículos cadastrados

---

### 3. Cadastrar Novo Veículo

```
http://localhost:3000/HTML/cadastrarVeiculo.html
```

**Campos obrigatórios:**

- Placa (ex: ABC1D23)
- Marca/Modelo (ex: Volkswagen Gol)
- Preço (ex: 45000)
- Ano de Fabricação (ex: 2020)
- Ano Modelo (ex: 2021)

**Como testar:**

1. Preencha o formulário
2. Clique em "Cadastrar"
3. Abra o console do navegador (F12) para ver a resposta
4. Verifique no Supabase se o veículo foi cadastrado na tabela `veiculo`

---

### 4. Cadastrar Cliente

```
http://localhost:3000/HTML/cadastrarCliente.html
```

**Campos principais:**

- Nome completo
- CPF
- Email
- Telefone
- Data de nascimento
- Senha

**Verificar:**

- Dados salvos na tabela `clientes` do Supabase

---

### 5. Cadastrar Funcionário

```
http://localhost:3000/HTML/cadastroFuncionario.html
```

**Campos principais:**

- Nome completo
- CPF
- Email
- Cargo
- Data de nascimento

**Verificar:**

- Dados salvos na tabela `funcionarios` do Supabase

---

## 🔍 VERIFICANDO SE FUNCIONOU

### Via API (Terminal):

```bash
# Ver carros do estoque
curl http://localhost:3000/estoque

# Ver veículos cadastrados
curl http://localhost:3000/veiculos

# Ver clientes
curl http://localhost:3000/clientes

# Ver funcionários
curl http://localhost:3000/funcionarios
```

### Via Supabase Dashboard:

1. Acesse: https://supabase.com/dashboard/project/bgyutjxwynwyuovuvgsz/editor
2. Clique em cada tabela para ver os registros

---

## ❌ PROBLEMAS COMUNS

### Erro 401/403 ao cadastrar:

- **Solução:** Desative o RLS nas tabelas (veja seção "Configuração Final")

### Formulário não envia:

- **Verificar:** Console do navegador (F12) → aba "Console"
- **Verificar:** Console do servidor para ver logs de erro

### Carros não aparecem na home:

- **Verificar:** Se a tabela `carro_estoque` tem dados
- **Verificar:** Se o RLS está desativado

---

## 📊 ENDPOINTS DA API

| Método | Endpoint        | Descrição                           |
| ------ | --------------- | ----------------------------------- |
| GET    | `/estoque`      | Lista carros para exibir na home    |
| GET    | `/veiculos`     | Lista todos os veículos cadastrados |
| POST   | `/veiculos`     | Cadastra novo veículo               |
| GET    | `/veiculos/:id` | Busca veículo por ID                |
| PATCH  | `/veiculos/:id` | Atualiza veículo                    |
| DELETE | `/veiculos/:id` | Deleta veículo                      |
| GET    | `/clientes`     | Lista clientes                      |
| POST   | `/clientes`     | Cadastra cliente                    |
| GET    | `/funcionarios` | Lista funcionários                  |
| POST   | `/funcionarios` | Cadastra funcionário                |

---

## ✨ PRÓXIMOS PASSOS

1. **Desativar RLS** nas tabelas restantes
2. **Testar cadastros** de veículo, cliente e funcionário
3. **Adicionar validações** nos formulários
4. **Implementar autenticação** (login/logout)
5. **Melhorar UI/UX** das páginas

---

## 🎉 TUDO FUNCIONANDO?

Se os carros estão aparecendo na home e você consegue cadastrar através dos formulários, o projeto está **100% funcional**! 🚀
