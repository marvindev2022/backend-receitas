# Plataforma de Compartilhamento de Receitas

Este README tem como objetivo fornecer informações sobre a API de compartilhamento de receitas culinárias. A plataforma permite que os usuários cadastrem, busquem, favoritem e comentem receitas.

## Documentação da API

A documentação completa da API pode ser encontrada em [Swagger](https://app.swaggerhub.com/apis-docs/USERNAME/PROJECTNAME/VERSION).

## Visão Geral

A API da Plataforma de Compartilhamento de Receitas permite a interação com os seguintes recursos:

- **Usuários**: Registro, login e obtenção de informações do usuário.
- **Receitas**: Criação, obtenção, atualização e exclusão de receitas.
- **Favoritos**: Adicionar e remover receitas dos favoritos.
- **Comentários**: Adicionar comentários às receitas.

## Requisitos

- **Node.js** (v12 ou superior)
- Banco de dados **PostgreSQL**

## Configuração

1. Clone o repositório:

```code
   git clone https://github.com/seu-usuario/seu-projeto.git
 ```  

 Instale as dependências:

```code
cd seu-projeto
npm install
```

Configure as variáveis de ambiente:

Crie um arquivo .env na raiz do projeto e defina as seguintes variáveis:

```code
DATABASE_URL=postgres://seu-usuario:senha@localhost:5432/nome-do-banco
```

 Execute as migrações do banco de dados:

```code
npx prisma migrate dev
```

 Inicie o servidor:

```code
npm start
```

Uso da API

Acesse a documentação do Swagger para obter detalhes sobre as rotas e parâmetros da API.

Contribuição
Se desejar contribuir para o projeto, siga as etapas abaixo:

Faça um fork do repositório.

 Crie uma branch para a sua feature ou correção:

```code
git checkout -b minha-feature
```

 Faça as alterações desejadas e faça commit:

```code
git commit -m "Minha alteração"
```

 Faça o push para o seu fork:

```code
git push origin minha-feature
```

Abra um Pull Request no repositório original.

## Insominia

Registrar um novo usuário
Método: POST
**Endpoint: /users/signup**
Corpo:

```code
{
  "name": "Nome do usuário",
  "email": "email@example.com",
  "password": "senha123"
}
```

Fazer login
Método: POST
**Endpoint: /users/signin**
Corpo:

```code
{
  "email": "email@example.com",
  "password": "senha123"
}
```

Validar e-mail
Método: POST
**Endpoint: /users/validate/email**
Corpo:

```code
{
  "email": "email@example.com"
}
```

Editar usuário
Método: PUT
**Endpoint: /users/:id**
Parâmetros:
id: ID do usuário a ser editado
Corpo:

```code
{
  "name": "Novo nome do usuário",
  "email": "novoemail@example.com",
  "password": "novasenha123"
}
```

Adicionar uma receita
Método: POST
**Endpoint: /users/:id/recipes**
Parâmetros:
id: ID do usuário
Corpo:

```code
{
  "title": "Título da receita",
  "description": "Descrição da receita",
  "ingredients": ["Ingrediente 1", "Ingrediente 2"],
  "steps": ["Passo 1", "Passo 2"]
}
```

Editar uma receita
Método: PUT
**Endpoint: /users/:userId/recipes/:recipeId**
Parâmetros:
userId: ID do usuário
recipeId: ID da receita
Corpo:

```code
{
  "title": "Novo título da receita",
  "description": "Nova descrição da receita",
  "ingredients": ["Ingrediente 1 atualizado", "Ingrediente 2 atualizado"],
  "steps": ["Passo 1 atualizado", "Passo 2 atualizado"]
}
```

Excluir uma receita
Método: DELETE
**Endpoint: /users/:userId/recipes/:recipeId**
Parâmetros:
userId: ID do usuário
recipeId: ID da receita
Adicionar um comentário em uma receita
Método: POST
**Endpoint: /users/:userId/recipes**/:recipeId/comments
Parâmetros:
userId: ID do usuário
recipeId: ID da receita
Corpo:

```code
{
  "text": "Texto do comentário"
}
```

Editar um comentário em uma receita
Método: PUT
**Endpoint: /users/:userId/recipes**/:recipeId/comments/:commentId
Parâmetros:
userId: ID do usuário
recipeId: ID da receita
commentId: ID do comentário
Corpo:

```code
{
  "text": "Novo texto do comentário"
}
```

Excluir um comentário em uma receita
Método: DELETE
**Endpoint: /users/:userId/recipes**/:recipeId/comments/:commentId
Parâmetros:
userId: ID do usuário
recipeId: ID da receita
commentId: ID do comentário

Adicionar uma receita aos favoritos
Método: POST
**Endpoint: /users/:userId/recipes**/:recipeId/favorite
Parâmetros:
userId: ID do usuário
recipeId: ID da receita

Remover uma receita dos favoritos
Método: DELETE
**Endpoint: /users/:userId/recipes**/:recipeId/favorite
Parâmetros:
userId: ID do usuário
recipeId: ID da receita

Lembre-se de substituir :id, :userId, :recipeId e :commentId pelos IDs reais nos endpoints
