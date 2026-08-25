# REC-SA-WILLER — API

API REST desenvolvida para a avaliação prática de Desenvolvimento de Sistemas, utilizando **Node.js**, **Express**, **PostgreSQL** e **Prisma ORM 7.9.1**.

O sistema simula o gerenciamento de médicos e especialidades médicas, utilizando um relacionamento **N:N (muitos-para-muitos)** por meio da tabela intermediária `MedicoEspecialidade`.

---

## 📋 Tecnologias utilizadas

- Node.js
- Express 5.2.1
- PostgreSQL
- Prisma ORM 7.9.1
- Prisma Adapter PostgreSQL
- Nodemon
- Thunder Client (testes da API)
- pgAdmin 4 (gerenciamento e consulta do banco de dados)

---

## 🗄️ Banco de Dados

O banco utilizado pelo projeto é: **samedica**

Configuração padrão:

| Parâmetro | Valor       |
|-----------|-------------|
| Host      | localhost   |
| Porta     | 5432        |
| Banco     | samedica    |
| Schema    | public      |
| Usuário   | postgres    |

A conexão é configurada no arquivo `.env`:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/samedica"
```

> ⚠️ O arquivo `.env` **não deve** ser enviado para o GitHub, pois contém informações de acesso ao banco de dados.

---

## 📁 Estrutura do projeto

```
REC-SA-WILLER/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── prisma.config.ts
└── README.md
```

> A pasta `node_modules` também existe localmente, mas **não deve** ser enviada para o GitHub.

---

## 🔗 Relacionamento do banco

O projeto possui três entidades principais:

**Médico**
- id
- nome
- crm

**Especialidade**
- id
- nome
- descricao

**MedicoEspecialidade** (tabela intermediária, responsável pelo relacionamento N:N)
- id
- medicoId
- especialidadeId

O relacionamento funciona da seguinte maneira:

```
   MEDICO
     │
     │ 1:N
     ▼
MEDICO_ESPECIALIDADE
     ▲
     │ N:1
     │
ESPECIALIDADE
```

Isso permite, por exemplo, que um médico tenha várias especialidades:

```
Médico João
 ├── Cardiologia
 ├── Pediatria
 └── Neurologia
```

E que a mesma especialidade pertença a vários médicos:

```
Cardiologia
 ├── João
 ├── Maria
 └── Carlos
```

---

## ⚙️ Instalação

Abra o terminal dentro da pasta do projeto:

```bash
cd C:\Users\kauany_bairros\REC-SA-WILLER
```

Instale as dependências:

```bash
npm install
```

---

## 🗃️ Prisma

Para verificar se o Prisma está funcionando:

```bash
npx prisma -v
```

O projeto utiliza:
- Prisma: `7.9.1`
- @prisma/client: `7.9.1`

Para gerar o Prisma Client:

```bash
npx prisma generate
```

---

## 🔄 Migrations

Para criar uma migration e atualizar o banco:

```bash
npx prisma migrate dev --name init
```

Para verificar o estado das migrations:

```bash
npx prisma migrate status
```

Se aparecer a mensagem:

```
Database schema is up to date!
```

significa que o banco está atualizado de acordo com o `schema.prisma`.

---

## 🧪 Testando a conexão com o PostgreSQL

Depois de configurar o `.env`, execute:

```bash
npx prisma migrate status
```

O resultado esperado será parecido com:

```
Prisma schema loaded from prisma\schema.prisma.

Datasource "db": PostgreSQL database "samedica",
schema "public" at "localhost:5432"

Database schema is up to date!
```

Isso confirma que o Prisma conseguiu acessar o PostgreSQL.

---

## ▶️ Iniciando o servidor

Para iniciar a API em modo desenvolvimento (com Nodemon):

```bash
npm run dev
```

O servidor será iniciado em: `http://localhost:3000`

Também é possível iniciar normalmente com:

```bash
npm start
```

---

## 🌐 Testando pelo navegador

Para verificar se o servidor está funcionando, acesse:

```
http://localhost:3000/
```

A API deve retornar uma mensagem indicando que o servidor e o banco estão funcionando.

---

## 🧰 Thunder Client

O Thunder Client pode ser utilizado dentro do VS Code para testar todas as rotas da API.

**URL base:** `http://localhost:3000`

### 👨‍⚕️ Médicos

**POST — Cadastrar médico**
```
POST http://localhost:3000/medicos
```
Body (JSON):
```json
{
    "nome": "Carlos Silva",
    "crm": "123456"
}
```
Outro exemplo:
```json
{
    "nome": "Ana Souza",
    "crm": "234567"
}
```

**GET — Listar médicos**
```
GET http://localhost:3000/medicos
```
Retorna todos os médicos cadastrados e suas especialidades vinculadas.

**GET — Buscar médico pelo ID**
```
GET http://localhost:3000/medicos/1
```
Troque `1` pelo ID desejado.

**PUT — Atualizar médico**
```
PUT http://localhost:3000/medicos/1
```
Body:
```json
{
    "nome": "Carlos Eduardo Silva",
    "crm": "999999"
}
```

**DELETE — Deletar médico**
```
DELETE http://localhost:3000/medicos/1
```
Troque `1` pelo ID do médico que deseja excluir.

### 🩺 Especialidades

**POST — Criar especialidade**
```
POST http://localhost:3000/especialidades
```
Body:
```json
{
    "nome": "Cardiologia",
    "descricao": "Especialidade médica responsável pelo diagnóstico e tratamento de doenças do coração."
}
```
Outro exemplo:
```json
{
    "nome": "Pediatria",
    "descricao": "Especialidade médica voltada ao atendimento de crianças e adolescentes."
}
```

**GET — Listar especialidades**
```
GET http://localhost:3000/especialidades
```

**PUT — Atualizar especialidade**
```
PUT http://localhost:3000/especialidades/1
```
Body:
```json
{
    "nome": "Cardiologia Avançada",
    "descricao": "Atendimento especializado em doenças cardiovasculares."
}
```

### 🔗 Vincular médico e especialidade

Para criar o relacionamento N:N:

```
POST http://localhost:3000/medicos/vincular
```
Body:
```json
{
    "medicoId": 1,
    "especialidadeId": 1
}
```

Isso significa: `Médico 1 → Especialidade 1`. O registro será criado na tabela `MedicoEspecialidade`.

### 🔎 Listar especialidades de um médico

```
GET http://localhost:3000/medicos/1/especialidades
```
Exemplo:
```
GET http://localhost:3000/medicos/2/especialidades
```
O resultado mostrará as especialidades vinculadas ao médico informado.

### ❌ Desvincular especialidade

Para remover somente o relacionamento entre um médico e uma especialidade:

```
DELETE http://localhost:3000/medicos/1/especialidades/2
```
Nesse exemplo: Médico `1`, Especialidade `2` — apenas o relacionamento será removido. O médico e a especialidade continuam cadastrados no banco.

---

## 🗄️ Consultando as tabelas no pgAdmin 4

Abra o pgAdmin 4 e conecte no PostgreSQL. Acesse:

```
Servers
└── PostgreSQL
    └── Databases
        └── samedica
            └── Schemas
                └── public
                    └── Tables
```

As tabelas criadas pelo Prisma estarão dentro de `public → Tables`.

**Consultar médicos**
```sql
SELECT * FROM "Medico";
```

**Consultar especialidades**
```sql
SELECT * FROM "Especialidade";
```

**Consultar relacionamentos**
```sql
SELECT * FROM "MedicoEspecialidade";
```

**Ver médicos e suas especialidades juntos**
```sql
SELECT
    m.id AS medico_id,
    m.nome AS medico,
    m.crm,
    e.id AS especialidade_id,
    e.nome AS especialidade,
    e.descricao
FROM "Medico" m
INNER JOIN "MedicoEspecialidade" me
    ON m.id = me."medicoId"
INNER JOIN "Especialidade" e
    ON e.id = me."especialidadeId";
```

Resultado esperado:

```
medico_id | medico        | crm    | especialidade_id | especialidade
----------+---------------+--------+-------------------+---------------
1         | Carlos Silva  | 123456 | 1                 | Cardiologia
1         | Carlos Silva  | 123456 | 2                 | Pediatria
2         | Ana Souza     | 234567 | 1                 | Cardiologia
```

**Ver somente os médicos e suas especialidades**
```sql
SELECT
    m.nome AS medico,
    e.nome AS especialidade
FROM "Medico" m
INNER JOIN "MedicoEspecialidade" me
    ON m.id = me."medicoId"
INNER JOIN "Especialidade" e
    ON e.id = me."especialidadeId";
```

**Contar registros**
```sql
SELECT COUNT(*) FROM "Medico";
SELECT COUNT(*) FROM "Especialidade";
SELECT COUNT(*) FROM "MedicoEspecialidade";
```

---

## 🛠️ Prisma Studio

Também é possível visualizar os dados através do Prisma Studio:

```bash
npx prisma studio
```

O Prisma abrirá uma interface para visualizar e manipular os registros das tabelas.

---

## 📦 Scripts do projeto

No `package.json`:

```json
"scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js"
}
```

- `npm run dev` — inicia o servidor usando Nodemon.
- `npm start` — inicia o servidor normalmente.

---

## 📌 Resumo dos comandos principais

| Ação                        | Comando                              |
|-----------------------------|---------------------------------------|
| Entrar na pasta              | `cd C:\Users\kauany_bairros\REC-SA-WILLER` |
| Instalar dependências        | `npm install`                        |
| Gerar Prisma Client          | `npx prisma generate`                |
| Criar migration               | `npx prisma migrate dev --name init` |
| Verificar banco               | `npx prisma migrate status`          |
| Iniciar servidor              | `npm run dev`                        |
| Abrir Prisma Studio           | `npx prisma studio`                  |

---

## 🌐 URLs principais

**Servidor:** `http://localhost:3000`

**Médicos**
```
GET    http://localhost:3000/medicos
POST   http://localhost:3000/medicos
GET    http://localhost:3000/medicos/:id
PUT    http://localhost:3000/medicos/:id
DELETE http://localhost:3000/medicos/:id
```

**Especialidades**
```
GET  http://localhost:3000/especialidades
POST http://localhost:3000/especialidades
PUT  http://localhost:3000/especialidades/:id
```

**Relacionamento N:N**
```
POST   http://localhost:3000/medicos/vincular
GET    http://localhost:3000/medicos/:id/especialidades
DELETE http://localhost:3000/medicos/:id/especialidades/:especialidadeId
```

---

## 🚀 Fluxo para executar o projeto do zero

1. Criar banco PostgreSQL
2. Configurar `DATABASE_URL`
3. Configurar `schema.prisma`
4. Executar `npx prisma generate`
5. Executar `npx prisma migrate dev`
6. Executar `npm run dev`
7. Abrir Thunder Client
8. Cadastrar médicos
9. Cadastrar especialidades
10. Vincular médicos às especialidades
11. Consultar os dados no PostgreSQL/pgAdmin

---

## 📚 Objetivo do projeto

O projeto tem como objetivo desenvolver uma API REST para gerenciamento de médicos e suas especialidades, aplicando conceitos de:

- Node.js
- Express
- PostgreSQL
- Prisma ORM
- CRUD
- API REST
- Relacionamento N:N
- Tabela intermediária
- Migrations
- Consultas SQL
- Integridade de dados
- Organização de projeto Back-end

O relacionamento principal do sistema é:

```
┌──────────────────┐
│      MÉDICO       │
├──────────────────┤
│ id                │
│ nome              │
│ crm               │
└────────┬──────────┘
         │
         │ 1:N
         ▼
┌───────────────────────┐
│  MEDICOESPECIALIDADE  │
├───────────────────────┤
│ id                     │
│ medicoId               │
│ especialidadeId        │
└──────────┬─────────────┘
           │
           │ N:1
           ▼
┌────────────────────┐
│   ESPECIALIDADE    │
├────────────────────┤
│ id                 │
│ nome               │
│ descricao          │
└────────────────────┘
```

| Item        | Valor              |
|-------------|--------------------|
| Banco       | samedica           |
| Servidor    | localhost:3000     |
| PostgreSQL  | localhost:5432     |
| ORM         | Prisma 7.9.1       |
| Runtime     | Node.js            |
| API         | Express            |
