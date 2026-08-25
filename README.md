REC-SA-WILLER — MediConnect APIAPI REST desenvolvida para a avaliação prática de Desenvolvimento de Sistemas, utilizando Node.js, Express, PostgreSQL e Prisma ORM 7.9.1.O sistema simula o gerenciamento de médicos e especialidades médicas, utilizando um relacionamento N:N (muitos-para-muitos) por meio da tabela intermediária MedicoEspecialidade.

📋 Tecnologias utilizadasNode.jsExpress 5.2.1PostgreSQLPrisma ORM 7.9.1Prisma Adapter PostgreSQLNodemonThunder Client (testes da API)pgAdmin 4 (gerenciamento e consulta do banco de dados)

🗄️ Banco de DadosO banco utilizado pelo projeto é: samedicaConfiguração padrão:




Parâmetro
Valor




Host
localhost


Porta
5432


Banco
samedica


Schema
public


Usuário
postgres


A conexão é configurada no arquivo .env:
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/samedica"

⚠️ O arquivo .env não deve ser enviado para o GitHub, pois contém informações de acesso ao banco de dados.


📁 Estrutura do projetoREC-SA-WILLER/
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

A pasta node_modules também existe localmente, mas não deve ser enviada para o GitHub.


🔗 Relacionamento do bancoO projeto possui três entidades principais:Médico
idnomecrm
Especialidade
idnomedescricao
MedicoEspecialidade (tabela intermediária, responsável pelo relacionamento N:N)
idmedicoIdespecialidadeId
O relacionamento funciona da seguinte maneira:
   MEDICO
     │
     │ 1:N
     ▼
MEDICO_ESPECIALIDADE
     ▲
     │ N:1
     │
ESPECIALIDADE
Isso permite, por exemplo, que um médico tenha várias especialidades:
Médico João
 ├── Cardiologia
 ├── Pediatria
 └── Neurologia
E que a mesma especialidade pertença a vários médicos:
Cardiologia
 ├── João
 ├── Maria
 └── Carlos

⚙️ InstalaçãoAbra o terminal dentro da pasta do projeto:
cd C:\Users\kauany_bairros\REC-SA-WILLER
Instale as dependências:
npm install

🗃️ PrismaPara verificar se o Prisma está funcionando:
npx prisma -v
O projeto utiliza:
Prisma: 7.9.1@prisma/client: 7.9.1
Para gerar o Prisma Client:
npx prisma generate

🔄 MigrationsPara criar uma migration e atualizar o banco:
npx prisma migrate dev --name init
Para verificar o estado das migrations:
npx prisma migrate status
Se aparecer a mensagem:
Database schema is up to date!
significa que o banco está atualizado de acordo com o schema.prisma.

🧪 Testando a conexão com o PostgreSQLDepois de configurar o .env, execute:
npx prisma migrate status
O resultado esperado será parecido com:
Prisma schema loaded from prisma\schema.prisma.

Datasource "db": PostgreSQL database "samedica",
schema "public" at "localhost:5432"

Database schema is up to date!
Isso confirma que o Prisma conseguiu acessar o PostgreSQL.

▶️ Iniciando o servidorPara iniciar a API em modo desenvolvimento (com Nodemon):
npm run dev
O servidor será iniciado em: http://localhost:3000Também é possível iniciar normalmente com:
npm start

🌐 Testando pelo navegadorPara verificar se o servidor está funcionando, acesse:
http://localhost:3000/
A API deve retornar uma mensagem indicando que o servidor e o banco estão funcionando.

🧰 Thunder ClientO Thunder Client pode ser utilizado dentro do VS Code para testar todas as rotas da API.URL base: http://localhost:3000
👨‍⚕️ MédicosPOST — Cadastrar médico
POST http://localhost:3000/medicos
Body (JSON):
{
    "nome": "Carlos Silva",
    "crm": "123456"
}
Outro exemplo:
{
    "nome": "Ana Souza",
    "crm": "234567"
}
GET — Listar médicos
GET http://localhost:3000/medicos
Retorna todos os médicos cadastrados e suas especialidades vinculadas.GET — Buscar médico pelo ID
GET http://localhost:3000/medicos/1
Troque 1 pelo ID desejado.PUT — Atualizar médico
PUT http://localhost:3000/medicos/1
Body:
{
    "nome": "Carlos Eduardo Silva",
    "crm": "999999"
}
DELETE — Deletar médico
DELETE http://localhost:3000/medicos/1
Troque 1 pelo ID do médico que deseja excluir.
🩺 EspecialidadesPOST — Criar especialidade
POST http://localhost:3000/especialidades
Body:
{
    "nome": "Cardiologia",
    "descricao": "Especialidade médica responsável pelo diagnóstico e tratamento de doenças do coração."
}
Outro exemplo:
{
    "nome": "Pediatria",
    "descricao": "Especialidade médica voltada ao atendimento de crianças e adolescentes."
}
GET — Listar especialidades
GET http://localhost:3000/especialidades
PUT — Atualizar especialidade
PUT http://localhost:3000/especialidades/1
Body:
{
    "nome": "Cardiologia Avançada",
    "descricao": "Atendimento especializado em doenças cardiovasculares."
}
🔗 Vincular médico e especialidadePara criar o relacionamento N:N:
POST http://localhost:3000/medicos/vincular
Body:
{
    "medicoId": 1,
    "especialidadeId": 1
}
Isso significa: Médico 1 → Especialidade 1. O registro será criado na tabela MedicoEspecialidade.
🔎 Listar especialidades de um médicoGET http://localhost:3000/medicos/1/especialidades
Exemplo:
GET http://localhost:3000/medicos/2/especialidades
O resultado mostrará as especialidades vinculadas ao médico informado.
❌ Desvincular especialidadePara remover somente o relacionamento entre um médico e uma especialidade:
DELETE http://localhost:3000/medicos/1/especialidades/2
Nesse exemplo: Médico 1, Especialidade 2 — apenas o relacionamento será removido. O médico e a especialidade continuam cadastrados no banco.

🗄️ Consultando as tabelas no pgAdmin 4Abra o pgAdmin 4 e conecte no PostgreSQL. Acesse:
Servers
└── PostgreSQL
    └── Databases
        └── samedica
            └── Schemas
                └── public
                    └── Tables
As tabelas criadas pelo Prisma estarão dentro de public → Tables.Consultar médicos
SELECT * FROM "Medico";
Consultar especialidades
SELECT * FROM "Especialidade";
Consultar relacionamentos
SELECT * FROM "MedicoEspecialidade";
Ver médicos e suas especialidades juntos
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
Resultado esperado:
medico_id | medico        | crm    | especialidade_id | especialidade
----------+---------------+--------+-------------------+---------------
1         | Carlos Silva  | 123456 | 1                 | Cardiologia
1         | Carlos Silva  | 123456 | 2                 | Pediatria
2         | Ana Souza     | 234567 | 1                 | Cardiologia
Ver somente os médicos e suas especialidades
SELECT
    m.nome AS medico,
    e.nome AS especialidade
FROM "Medico" m
INNER JOIN "MedicoEspecialidade" me
    ON m.id = me."medicoId"
INNER JOIN "Especialidade" e
    ON e.id = me."especialidadeId";
Contar registros
SELECT COUNT(*) FROM "Medico";
SELECT COUNT(*) FROM "Especialidade";
SELECT COUNT(*) FROM "MedicoEspecialidade";

🛠️ Prisma StudioTambém é possível visualizar os dados através do Prisma Studio:
npx prisma studio
O Prisma abrirá uma interface para visualizar e manipular os registros das tabelas.

📦 Scripts do projetoNo package.json:
"scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js"
}
npm run dev — inicia o servidor usando Nodemon.npm start — inicia o servidor normalmente.

📌 Resumo dos comandos principais



Ação
Comando




Entrar na pasta
cd C:\Users\kauany_bairros\REC-SA-WILLER


Instalar dependências
npm install


Gerar Prisma Client
npx prisma generate


Criar migration
npx prisma migrate dev --name init


Verificar banco
npx prisma migrate status


Iniciar servidor
npm run dev


Abrir Prisma Studio
npx prisma studio



🌐 URLs principaisServidor: http://localhost:3000Médicos
GET    http://localhost:3000/medicos
POST   http://localhost:3000/medicos
GET    http://localhost:3000/medicos/:id
PUT    http://localhost:3000/medicos/:id
DELETE http://localhost:3000/medicos/:id
Especialidades
GET  http://localhost:3000/especialidades
POST http://localhost:3000/especialidades
PUT  http://localhost:3000/especialidades/:id
Relacionamento N:N
POST   http://localhost:3000/medicos/vincular
GET    http://localhost:3000/medicos/:id/especialidades
DELETE http://localhost:3000/medicos/:id/especialidades/:especialidadeId

🚀 Fluxo para executar o projeto do zeroCriar banco PostgreSQLConfigurar DATABASE_URLConfigurar schema.prismaExecutar npx prisma generateExecutar npx prisma migrate devExecutar npm run devAbrir Thunder ClientCadastrar médicosCadastrar especialidadesVincular médicos às especialidadesConsultar os dados no PostgreSQL/pgAdmin

📚 Objetivo do projetoO projeto tem como objetivo desenvolver uma API REST para gerenciamento de médicos e suas especialidades, aplicando conceitos de:
Node.jsExpressPostgreSQLPrisma ORMCRUDAPI RESTRelacionamento N:NTabela intermediáriaMigrationsConsultas SQLIntegridade de dadosOrganização de projeto Back-end
O relacionamento principal do sistema é:
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




Item
Valor




Banco
samedica


Servidor
localhost:3000


PostgreSQL
localhost:5432


ORM
Prisma 7.9.1


Runtime
Node.js


API
Express