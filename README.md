<h1 align="center">
  <img alt="FastFeet" height="215" title="FastFeet" src=".github/logo.svg" />
</h1>

<p align="center">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-191A1E">

  <a href="https://github.com/ruancaetano/">
    <img alt="Made by Ruan Caetano" src="https://img.shields.io/badge/Made%20by-Ruan%20Caetano-191A1E">
  </a>
</p>

<p align="justify">Aplicação para gerenciamento de encomendas contendo uma api rest, um portal web com funções destinadas a empresa de transporte e uma aplicação mobile com funcionalidades direcionadas ao entregador. O projeto foi esenvolvido como proposta de avalição final do GoStack Bootcamp da Rocketseat.</p>

## :rocket: Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org/)
- [React Native](https://reactnative.dev/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [PostgreSQL](https://www.postgresql.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://github.com/expressjs/express)
- [Redis](https://redis.io/)
- [Bee-Queue](https://github.com/bee-queue/bee-queue)

## :computer: Instalação, execução e desenvolvimento

### Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node](https://nodejs.org/en/)
- [Cocoapods](https://cocoapods.org/) - <small>Apenas se desejar executar a aplicação mobile para IOS</small>

**Faça um clone desse repositório**

### Back-end - API REST

- A partir da raiz do projeto, entre no diretório do back-end rodando o comando `cd server`;

- Rode `yarn` para instalar as dependências do projeto;

- Rode `cp .env.example .env` e preencha o arquivo `.env` com SUAS variáveis ambiente;

- Rode `docker-compose up` para executar o ambiente;

- Na primeira executação do projeto, para cadastrar o usuário administrador que acessará a aplicação web rode os seguintes comandos após garantir que a etapa acima foi executada:

  1 - Rode o comando abaixo para acessar o container docker onde a api rest está executando

  ```
  docker exec -i -t fastfeet_server sh
  ```

  <small>
  Caso tenha problemas com o comando acima, tente substituir sh por /bin/bash
  </small>

  2 - Com o devido acesso ao container execute o comando abaixo para cadastrar o usuário no banco de dados

  ```
  yarn sequelize db:seed:all
  ```

### Web

_ps: Antes de executar, lembre-se de iniciar o backend deste projeto_

- A partir da raiz do projeto, entre na pasta do front-end web rodando `cd web`;
- Rode `yarn` para instalar as dependências;

- Rode `yarn start` para iniciar o client web;

### Mobile

_ps: Antes de executar, lembre-se de iniciar o backend deste projeto_

- A partir da raiz do projeto, entre na pasta do frontend mobile rodando `cd mobile`;

- Rode `yarn` para instalar as dependências;

- Caso deseje executar o app em um ambiente IOS, execute o seguinte comando `cd ios && pod install && cd ..`

- Edite o arquivo `mobile/src/services/api.js`, alterando `baseURL` para o IP correspondente a máquina que estiver executando o `backend`;

- Abra o emulador/simulador do sistema operacional que deseja acessar;

- Execute o comando abaixo para gerar uma build da aplicação

  ```
    yarn react-native run-android
  ```

  ou

  ```
  yarn react-native run-ios
  ```
