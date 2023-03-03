<h1 align="center">Store Manager API</h1>

Este projeto desenvolvi minha primeira API utilizando a arquitetura MSC (model-service-controller) com Node.js. A API é um sistema de gerenciamento de vendas no formato dropshipping, que permite criar, visualizar, deletar e atualizar produtos e vendas. Para o gerenciamento dos dados, foi utilizado o banco de dados MySQL. O projeto é uma excelente oportunidade para aprender mais sobre o desenvolvimento de APIs e o uso de bancos de dados em JavaScript.

<h2>Stack utilizada</h2>

Back-end: `Node`, `Express`, `Javascript`, `MySQL2`, `Docker`

<h2>🐋 Rodando no Docker</h2>

1. Clone o repositório em sua máquina local.

2. Certifique-se de ter o docker-compose instalado.

3. Execute o comando `docker-compose up -d`.

4. Acesse o endereço http://localhost:3000 para acessar a API.

⚠️ **Atenção** ⚠️ Caso opte por utilizar o Docker, TODOS os comandos disponíveis no package.json (npm start, npm test, npm run dev, ...) devem ser executados DENTRO do container, ou seja, no terminal que aparece após a execução do comando docker exec citado acima.

⚠️ **Atenção** ⚠️ O git dentro do container não vem configurado com suas credenciais. Faça os commits fora do container, ou configure as suas credenciais do git dentro do container.

⚠️ **Atenção** ⚠️ Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

⚠️ **Atenção** ⚠️ Caso você esteja usando macOS e ao executar o docker-compose up -d se depare com o seguinte erro:

```typescript
The Compose file './docker-compose.yml' is invalid because:
Unsupported config option for services.db: 'platform'
Unsupported config option for services.node: 'platform'
```

<details>
  <summary><strong>🤷🏽‍♀️ Foram encontradas 2 possíveis soluções para este problema:</strong></summary><br />

- Você pode adicionar manualmente a option platform: linux/amd64 no service do banco de dados no arquivo docker-compose.yml do projeto, mas essa é uma solução local e você deverá reproduzir isso para os outros projetos.

- Você pode adicionar manualmente nos arquivos .bashrc, .zshenv ou .zshrc do seu computador a linha export DOCKER_DEFAULT_PLATFORM=linux/amd64, essa é uma solução global. As soluções foram com base nesta fonte.
</details>

<h1 align="center">Documentação da API</h1>

**Login na aplicação**

```http
  POST /login
```

| Parâmetro  | Tipo     | Descrição                                                      |
| :--------- | :------- | :------------------------------------------------------------- |
| `email`    | `string` | **Obrigatório no body**. Email cadastrado no banco de dados    |
| `password` | `string` | **Obrigatório no body**. Password cadastrado no banco de dados |

**Cadastrar um produto**

```http
  POST /products
```

| Parâmetro | Tipo     | Descrição                                              |
| :-------- | :------- | :----------------------------------------------------- |
| `name`    | `string` | **Obrigatório no body**. Name para cadastrar o produto |

**Cadastrar uma venda**

```http
  POST /sales
```

| Parâmetro                 | Tipo    | Descrição                                                                                             |
| :------------------------ | :------ | :---------------------------------------------------------------------------------------------------- |
| `[{productId, quantity}]` | `array` | **Obrigatório no body**. Um array com varios objetos de ProductId e Quantity para cadastrar as vendas |

**Pegar produtos**

```http
  GET /products
  GET /products/search
  GET /products/:id
```

**Pegar vendas**

```http
  GET /sales
  GET /sales/:id
```

**Atualizar produtos**

```http
  PUT /products/:id
```

**Atualizar vendas**

```http
  PUT /sales/:id
```

**Deletar produtos**

```http
  DELETE /products/:id
```

**Deletar vendas**

```http
  DELETE /sales/:id
```

Qualquer duvida entre em contato comigo:

E-mail: higor.maranhao2000@gmail.com

Linkedin: https://www.linkedin.com/in/higor-maranhao/
