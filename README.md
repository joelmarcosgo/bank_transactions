<div align='center'>
    <h1>Transações Bancárias</h1>
</div>

# Descrição

# Sobre o desafio 🧐
O objetivo é implementar um sistema (uma api REST) de transações bancarias.

O projeto final deve ser entregue como um repositório público com as instruções de instalação e execução

## Requisitos 🤨
- Node.js com Typescript
- Express ou qualquer outro framework como Koa, Hapi, etc...
- Banco de dados relacional (Usamos principalmente postgreSQL)
- Docker
- ORM
- Testes
- Clean Code

### Pontos que não são obrigatórios mas que chamariam nossa atenção 🤩

- Clean Architecture
- SOLID
- Boas práticas de desenvolvimento

<br>

# Requisitos da Aplicação
- Cadastrar uma conta
- Listar todas as contas
- Atualizar dados da conta
- Excluir conta
- Depositar
- Sacar
- Transferir

### Uma conta deve ter:
- Número da conta
- Agencia
- Saldo
- Data de abertura
- Representante

### Um representante deve ter:
- CPF
- Nome
- Email
- Data de nascimento
- Endereço
- Telefone

## Extras (Não obrigatórios):
### Implementar um sistema de extrato para as contas
## `Foi desenvolvido, utilizando ReactJS, um dashboard para acompanhar o extrato das transações bancárias realizadas na aplicação. Para acessar o repositório do projeto, acesse o link:`<a href="https://github.com/joelmarcosgo/extrato_bancario_frontend">https://github.com/joelmarcosgo/extrato_bancario_frontend</a>

<br>

# Executando o projeto

```bash
# Clonar o repositório
$ git clone https://github.com/hereisjohnny2/rentalx.git

# Executar os comandos
$ yarn
# ou
$ npm install

# Criar a imagem
$ docker build -t transactions_banking

# Rodar aplicação em modo de desenvolvimento
$ docker-compose up
```

<br>

# Executando os testes automatizados

```bash
# Executar os comandos
$ yarn test
# ou
$ npm test
```

<br>

# Documentação API - Rotas

## `GET /api/owner`

Retorna todas os representantes armazenados no banco de dados.

## `POST /api/owner`

Cria um novo representante, recebendo o `name` (required, string), o `cpf`(required, string), o `email` (required, string), a `birth_date` (required, string),
o `address` (required, string), o `address_number` (required, string), o `complement` (not required, string), o `neighborhood` (required, string), o `zipcode` (required, string), a `city` (required, string), o `state` (required, string) e o `phone` (required, string) no corpo (body) da requisição.

O formato da requisição fica da seguinte forma:
```json
{
	"name": "User Test",
	"cpf": "123.456.789-02",
	"email": "teste@email.com",
	"birth_date": "1997-06-23",
	"address": "Rua 17",
	"address_number": "0000",
	"complement": "",
	"neighborhood": "Santos Dumont",
	"zipcode": "74.463-630",
	"city": "Goiania",
	"state": "GO",
	"phone": "62981832006"
}
```
### OBS.: essa requisição retorna o objeto cadastrado com id, que será utilizado no cadastro da conta bancária,
para relacionar a conta bancária com o seu representante.

## `PUT /api/owner/:id`

Atualiza o representante com o id informado no parametro :id, recebendo o `name` (string), o `cpf`(string), o `email` (string), a `birth_date` (string), o `address` (string), o `address_number` (string), o `complement` (not string), o `neighborhood` (string), o `zipcode` (string), a `city` (string), o `state` (string) e o `phone` (string) no corpo (body) da requisição.

O formato da requisição fica da seguinte forma:
```json
{
	"name": "User Test",
	"cpf": "123.456.789-02",
	"email": "teste@email.com",
	"birth_date": "1997-06-23",
	"address": "Rua 17",
	"address_number": "0000",
	"complement": "",
	"neighborhood": "Santos Dumont",
	"zipcode": "74.463-630",
	"city": "Goiania",
	"state": "GO",
	"phone": "62981832006"
}
```

## `DELETE /api/owner/:id`

Exclui o representante com o id informado no parametro :id. Caso o representante possua contas relacionadas, o mesmo não poderá ser excluído.

<br>

## `GET /api/account`

Retorna todas as contas bancárias armazenadas no banco de dados.

## `POST /api/account`

Cria uma nova conta bancária, recebendo o `account_owner_id` (ID do representante da conta cadastrado, required, string), o `account_number` (required, string), o `agency_number` (required, string) e o `account_balance` (required, decimal) no corpo da requisição.

O formato da requisição fica da seguinte forma:
```json
{
	"account_owner_id": "d4ccacc5-7f35-46cf-af2e-7bc06b63bc1e", 
	"account_number": "12345678904", 
	"agency_number": "0001", 
	"account_balance": 1234.59
}
```

## `PUT /api/account/:id`

Atualiza a conta bancária com o mesmo id informado no parametro :id, recebendo o `account_number` (required, string), o `agency_number` (required, string) e o `account_balance` (required, decimal) no corpo da requisição. 

O formato da requisição fica da seguinte forma:
```json
{
	"account_number": "12345678904", 
	"agency_number": "0001", 
	"account_balance": 1234.59
}
```

## `DELETE /api/account/:id`

Exclui a conta bancária com o id informado no parametro :id. 

<br>

## `GET /api/transactions`

Retorna todas as transações bancárias armazenadas no banco de dados.

## `POST /api/transactions`

Cria uma nova transação bancária. Pode ser criado uma transação de depósito, saque ou transferência, dependendo do `transaction_type` especificado. Veja abaixo:

### Depósito (deposit):
Para criar uma transação de depósito deve ser enviado no corpo da requisição, o `account_number` (required, string), o `agency_number` (required, string), o `transaction_type` (deposit, required, string), a `description` (required, string), a `transaction_category` (required, string) e o `amount` (required, decimal).

O formato da requisição fica da seguinte forma:
```json
{
	"account_number": "12345678901",
	"agency_number": "0001",
	"transaction_type": "deposit",
	"description": "Sálario",
	"transaction_category": "Receitas",
	"amount": 1234.56
}
```

### Saque (withdraw):
Para criar uma transação de depósito deve ser enviado no corpo da requisição, o `account_number` (required, string), o `agency_number` (required, string), o `transaction_type` (deposit, required, string), a `description` (required, string), a `transaction_category` (required, string) e o `amount` (required, decimal).

O formato da requisição fica da seguinte forma:
```json
{
	"account_number": "12345678901",
	"agency_number": "0001",
	"transaction_type": "withdraw",
	"description": "Faculdade",
	"transaction_category": "Educação",
	"amount": 230.56
}
```

### Transferência (transfer):
Para criar uma transação de transferência deve ser enviado no corpo da requisição, o `account_number` (required, string), o `agency_number` (required, string), o `transaction_type` (deposit, required, string), a `description` (required, string), a `transaction_category` (required, string) e o `amount` (required, decimal). Além desses valores padrão, deve ser informado o `to_account_number` (string) e o `to_agency_number` (string), que são as informações da conta de destino.

O formato da requisição fica da seguinte forma:
```json
{
	"account_number": "12345678901",
	"agency_number": "0001",
	"transaction_type": "transfer",
	"description": "Transferência",
	"transaction_category": "Pagamentos",
	"amount": 125.56,
	"to_account_number": "12345678903",
	"to_agency_number": "0001"
}
```
