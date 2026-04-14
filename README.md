# Catálogo Mobile

Este projeto foi desenvolvido para a disciplina de Mobile Development.

A proposta é criar um aplicativo mobile com React Native e Expo para listar produtos de uma loja online, separados por categorias masculina e feminina, com navegação entre telas e consumo de API REST.

## Funcionalidades

Tela de login com validação de campos.

Armazenamento temporário do usuário com Redux Toolkit.

Tela de produtos com separação por abas:
Masculino
Feminino

Consumo de dados da API DummyJSON com Axios.

Tela de detalhes do produto com imagem, nome, descrição, preço, desconto e categoria.

Logout funcional, retornando para a tela de login.

## Tecnologias utilizadas

React Native
Expo
Axios
Redux Toolkit
React Redux
React Navigation

## Estrutura do projeto

O projeto foi organizado da seguinte forma:

`src/screens`  
Contém as telas principais do aplicativo.

`src/components`  
Contém componentes reutilizáveis, como card de produto, loading e mensagem de erro.

`src/services`  
Contém a configuração da API e os serviços de busca de produtos.

`src/store`  
Contém a store global e o slice de autenticação com Redux Toolkit.

`src/styles`  
Contém cores e estilos compartilhados do projeto.

## Como executar o projeto

Primeiro, entre na pasta do projeto:

***
cd catalogo-mobile
***

Depois, instale as dependências:

***
npm install
***

Para iniciar o projeto com Expo:

```
npx expo start
```

Se houver problema de rede no Expo, pode iniciar em modo offline:

```
npx expo start --offline
```

Para testar no navegador, pressione:

```
w
```

Também é possível testar no celular com o aplicativo Expo Go, lendo o QR Code exibido no terminal.

## API utilizada

A aplicação consome dados da API DummyJSON.

Foram utilizadas rotas de categorias de produtos e rota de detalhes por ID.


## Observações

Este projeto foi desenvolvido com foco em organização de código, separação de responsabilidades e navegação entre telas.

A ideia principal foi aplicar, na prática, os conceitos estudados em aula sobre desenvolvimento mobile com React Native, consumo de API e gerenciamento de estado.
