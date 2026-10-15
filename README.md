# FlowFinance API

Backend do painel de finanças pessoais desenvolvido em NestJS + Prisma + PostgreSQL.

## Visão geral

Essa API foi pensada para servir como base para um dashboard financeiro completo, com autenticação de usuários, controle de receitas e despesas, limites por categoria e organização de metas financeiras. O objetivo principal é oferecer uma estrutura sólida para que o frontend consuma dados confiáveis, com regras de negócio bem definidas e uma modelagem pronta para evoluir.

## Tecnologias

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT + Passport
- bcrypt

## Como funciona

A aplicação segue a arquitetura em camadas do NestJS:

- `auth`: cadastro e login com autenticação JWT
- `users`: dados do usuário autenticado
- `transactions`: criação, listagem, remoção e resumo financeiro
- `budgets`: controle de limites por categoria
- `prisma`: conexão com o banco e acesso ao ORM

O fluxo principal é simples:

1. O usuário se cadastra ou faz login.
2. O backend retorna um token JWT.
3. O frontend envia esse token em todas as requisições autenticadas.
4. As transações e orçamentos são persistidas no banco relacional, com relacionamento por `userId`.

## Estrutura do banco

O modelo principal foi pensado para suportar um painel financeiro pessoal completo.

- `User`: identifica cada usuário da aplicação.
- `Transaction`: registra receitas e despesas.
- `Budget`: define limites mensais por categoria.

## Endpoints principais

### Autenticação

- `POST /auth/register`
- `POST /auth/login`

### Usuário autenticado

- `GET /users/me`

### Transações

- `POST /transactions`
- `GET /transactions`
- `GET /transactions/summary`
- `DELETE /transactions/:id`

### Orçamentos

- `POST /budgets`
- `GET /budgets`
- `DELETE /budgets/:id`

## Como usar

### 1. Clone o repositório

```bash
git clone https://github.com/Akinori5184/flowfinance.git
cd flowfinance
```

### 2. Suba o banco PostgreSQL

```bash
docker compose up -d
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure as variáveis de ambiente

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

### 5. Gere o Prisma Client e rode as migrações

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 6. (Opcional) Popular dados de teste

```bash
npm run prisma:seed
```

### 7. Rode a API

```bash
npm run start:dev
```

A aplicação ficará disponível em:

```text
http://localhost:3000
```

## Exemplos de uso

### Registrar usuário

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria",
    "email": "maria@email.com",
    "password": "123456"
  }'
```

### Fazer login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "maria@email.com",
    "password": "123456"
  }'
```

### Criar transação autenticada

```bash
curl -X POST http://localhost:3000/transactions \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Salário",
    "amount": "4500.00",
    "type": "INCOME",
    "category": "Salário",
    "date": "2026-10-15T12:00:00.000Z"
  }'
```

### Listar transações

```bash
curl http://localhost:3000/transactions \
  -H "Authorization: Bearer SEU_TOKEN"
```

## Como eu fiz

A estrutura foi montada pensando em clareza e escalabilidade:

- Criei um backend com NestJS e TypeScript para manter a aplicação organizada por módulos.
- Usei o Prisma para centralizar o modelo de dados e facilitar migrações de banco.
- Defini entidades básicas com relacionamento por usuário.
- Implementei autenticação JWT para separar acesso público e privado.
- Organizei cada funcionalidade em módulo próprio (`auth`, `transactions`, `budgets`, `users`).
- Mantive a API pronta para consumo por um frontend em Next.js ou qualquer outra interface.

## Próximos passos

Essa base já permite evoluir para:

- dashboard com resumo mensal
- filtros por mês/semana/ano
- alertas de orçamento por categoria
- importar extratos CSV/OFX
- relatórios com gráficos de receitas vs despesas
- paginação e filtros mais robustos
- testes unitários e de integração

## Observação

Este projeto é uma base sólida para um painel financeiro pessoal e foi criado com foco em portfólio, boa arquitetura e evolução contínua.

Se quiser, na próxima etapa eu posso transformar esse backend em uma interface moderna com Next.js + Tailwind + gráficos em Recharts.

---

Feito com foco em escalabilidade, organização e valorização profissional.
