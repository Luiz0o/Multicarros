# 🗄️ Configuração das Tabelas no Supabase

## ⚠️ IMPORTANTE: Crie estas tabelas no seu Supabase antes de testar!

Acesse: https://bgyutjxwynwyuovuvgsz.supabase.co/project/bgyutjxwynwyuovuvgsz/editor

---

## 📋 Tabela: `veiculos`

```sql
CREATE TABLE veiculos (
    id SERIAL PRIMARY KEY,
    placa VARCHAR(10) UNIQUE NOT NULL,
    marca VARCHAR(100),
    modelo VARCHAR(100),
    marcaModelo VARCHAR(200),
    anoFabricacao INTEGER,
    anoModelo INTEGER,
    ano_modelo INTEGER,
    fabricacao INTEGER,
    categoria VARCHAR(50),
    cor VARCHAR(50),
    preco DECIMAL(10, 2) NOT NULL,
    renavam VARCHAR(20),
    chassi VARCHAR(50),
    cambio VARCHAR(20),
    especie VARCHAR(50),
    status VARCHAR(20),
    descricao TEXT,
    foto TEXT,
    tipo VARCHAR(20),
    combustivel VARCHAR(20),
    km INTEGER,
    posicao BOOLEAN,
    portas INTEGER,
    numero_motor VARCHAR(50),
    numero_cambio VARCHAR(50),
    data_cadastro TIMESTAMP DEFAULT NOW()
);
```

---

## 👥 Tabela: `clientes`

```sql
CREATE TABLE clientes (
    cpf VARCHAR(14) PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    Rg VARCHAR(20),
    data_nascimento DATE,
    senha VARCHAR(255),
    criado_em TIMESTAMP DEFAULT NOW()
);
```

---

## 👔 Tabela: `funcionarios`

```sql
CREATE TABLE funcionarios (
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    nome VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    data_nascimento DATE,
    senha VARCHAR(255),
    tipo VARCHAR(50),
    criado_em TIMESTAMP DEFAULT NOW()
);
```

---

## 🧪 Dados de Teste

### Inserir veículos de teste:

```sql
INSERT INTO veiculos (placa, marcaModelo, marca, modelo, preco, anoFabricacao, anoModelo, categoria, status, especie, cambio, cor, chassi, renavam, descricao, tipo)
VALUES
('ABC1234', 'Chevrolet Onix', 'Chevrolet', 'Onix', 82900.00, 2022, 2023, 'Hatch', 'Seminovo', 'Automóvel', 'Manual', 'Preto', '9BWZZZ377VT004251', '12345678901', '1.0 Flex Manual - Carro em ótimo estado', 'carro'),
('DEF5678', 'Toyota Corolla XEI', 'Toyota', 'Corolla XEI', 134000.00, 2023, 2023, 'Sedan', 'Seminovo', 'Automóvel', 'Automático', 'Prata', '9BWZZZ377VT004252', '12345678902', '2.0 Flex Automático - Apenas 71.000 km', 'carro'),
('GHI9012', 'Honda Civic', 'Honda', 'Civic', 124900.00, 2023, 2023, 'Sedan', 'Seminovo', 'Automóvel', 'Automático', 'Branco', '9BWZZZ377VT004253', '12345678903', '2.0 Sport CVT - Impecável', 'carro');
```

### Inserir clientes de teste:

```sql
INSERT INTO clientes (cpf, nome, email, telefone, data_nascimento)
VALUES
('123.456.789-00', 'João Silva', 'joao@email.com', '(61) 98765-4321', '1990-05-15'),
('987.654.321-00', 'Maria Santos', 'maria@email.com', '(61) 99876-5432', '1985-08-20');
```

---

## ✅ Verificação

Após criar as tabelas, teste no SQL Editor do Supabase:

```sql
-- Verificar veículos
SELECT * FROM veiculos;

-- Verificar clientes
SELECT * FROM clientes;

-- Verificar funcionários
SELECT * FROM funcionarios;
```

---

## 🔧 Solução de Problemas

### Erro: "relation veiculos does not exist"

- ✅ Crie a tabela `veiculos` com o SQL acima

### Erro: "column does not exist"

- ✅ Verifique se todos os campos da tabela foram criados corretamente

### Nenhum veículo aparece na home

- ✅ Insira dados de teste na tabela `veiculos`
- ✅ Verifique se o servidor está rodando: `npm run dev`
- ✅ Teste o endpoint: `http://localhost:3000/veiculos`

---

## 📞 Endpoints da API

- `GET /veiculos` - Listar todos os veículos
- `POST /veiculos` - Cadastrar veículo
- `GET /clientes` - Listar todos os clientes
- `POST /clientes` - Cadastrar cliente
- `GET /funcionarios` - Listar todos os funcionários
- `POST /funcionarios` - Cadastrar funcionário
