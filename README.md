# Projeto de Back To Me

Este README tem como objetivo fornecer informações sobre as rotas e queries utilizadas no projeto ***Back To Me***. O projeto visa desenvolver um sistema para auxiliar na busca de animais perdidos e facilitar a adoção de animais disponíveis. Os usuários poderão cadastrar animais perdidos ou disponíveis para adoção, além de buscar animais com base em critérios específicos.

## Funcionalidades - SWAGGER

<https://app.swaggerhub.com/apis-docs/MAVIROLERO/BackToMe/1.0.0>

### Informações gerais

**Versão da API**: 1.0.0
**Título**: Projeto de Animais Perdidos ou Doados
**Descrição**: API para busca de animais perdidos e adoção de animais disponíveis.

### Servidores

**Servidor local**: <http://localhost:3000>
**Servidor deploy**: <https://api-backtome.onrender.com/>

### Tags

- Usuários
- Animais Perdidos
- Animais para Adoção

### Rotas

- **Cadastrar** novo usuário
- **Método**: POST
- **Rota**: /users/registered
- **Tags**: Usuários
- **Descrição**: Rota para cadastrar um novo usuário.

``` Exemplo JSON:

{
  "name": "Nome do usuário",
  "email": "<email@example.com>",
  "cpf": "12345678900",
  "phone": "123456789",
  "password": "senha123",
  "address": {
    "cep": "25264253",
    "complement": "502"
  }
}
Exemplo de tipo:
{
  "name": "string",
  "email": "string",
  "cpf": "string",
  "phone": "string",
  "password": "string",
  "address": {
    "cep": "string",
    "complement": "string"
  }
}
```

**Respostas**:

**200**: Usuário cadastrado com sucesso!
**400**: Erro ao cadastrar usuário!

### Login do usuário

- **Método**: POST
- **Rota**: /users/login
- **Tags**: Usuários
- **Descrição**: Rota de login do usuário.

``` Exemplo JSON:
{
  "email": "<email@example.com>",
  "password": "123456"
}
Exemplo de tipo:
{
  "email": "string",
  "password": "string"
}
```

**Respostas**:

**200**: Usuário logado com sucesso!
**400**: Erro ao realizar login!

### Editar dados do usuário

- **Método**: PUT
- **Rota**: /users/{userId}
- **Tags**: Usuários
- **Descrição**: Rota para editar dados do usuário.
- **Parâmetros** de URL:
- **userId** (integer): ID do usuário

``` Exemplo JSON:
{
  "name": "Nome do usuário",
  "email": "<email@example.com>",
  "cpf": "12345678900",
  "phone": "123456789",
  "password": "senha123",
  "address": {
    "cep": "25264253",
    "complement": "502"
  }
}
Exemplo de tipo:
{
  "name": "string",
  "email": "string",
  "cpf": "string",
  "phone": "string",
  "password": "string",
  "address": {
    "cep": "string",
    "complement": "string"
  }
}
```

**Respostas**:

**200**: Dados do usuário atualizados com sucesso!
**400**: Erro ao atualizar dados do usuário!
**404**: Usuário não encontrado!

### Buscar animais perdidos

**Método**: GET

**Rota**: /animals/lost

- **Tags**: Animais Perdidos
- **Descrição**: Rota para buscar animais perdidos.
- **Parâmetros** de consulta:
- **status** (string): Status do animal (opcional)
- **cidade** (string): Nome da cidade onde o animal foi perdido (opcional)

**Respostas**:

**200**: Lista de animais perdidos encontrados com sucesso!
**400**: Erro ao buscar animais perdidos!

### Buscar animais para adoção

- **Método**: GET
- **Rota**: /animals/available
- **Tags**: Animais para Adoção
- **Descrição**: Rota para buscar animais disponíveis para adoção.
- **Parâmetros** de consulta:
- **especie** (string): Espécie do animal (opcional)
- **porte** (string): Porte do animal (opcional)
- **idade** (integer): Idade do animal em meses (opcional)

**Respostas**:

**200**: Lista de animais para adoção encontrados com sucesso!
**400**: Erro ao buscar animais para adoção!

### Cadastrar animal perdido

- **Método**: POST
- **Rota**: /animals/lost
- **Tags**: Animais Perdidos
- **Descrição**: Rota para cadastrar um animal perdido.

``` Exemplo JSON:
{
  "nome": "Nome do animal",
  "especie": "Espécie do animal",
  "porte": "Porte do animal",
  "idade": 12,
  "cidade": "Cidade onde foi perdido",
  "descricao": "Descrição do animal perdido"
}
Exemplo de tipo:
{
  "nome": "string",
  "especie": "string",
  "porte": "string",
  "idade": "integer",
  "cidade": "string",
  "descricao": "string"
}
```

**Respostas**:

**200**: Animal perdido cadastrado com sucesso!
**400**: Erro ao cadastrar animal perdido!

### Cadastrar animal para adoção

- **Método**: *POST*
- **Rota**: */animals/available*
- **Tags**: *Animais para Adoção*
- **Descrição**: *Rota para cadastrar um animal disponível para adoção.*

``` Exemplo JSON:
{
  "nome": "Nome do animal",
  "especie": "Espécie do animal",
  "porte": "Porte do animal",
  "idade": 24,
  "descricao": "Descrição do animal para adoção"
}
Exemplo de tipo:
{
  "nome": "string",
  "especie": "string",
  "porte": "string",
  "idade": "integer",
  "descricao": "string"
}
```

 **Respostas**:

**200**: Animal para adoção cadastrado com sucesso!
**400**: Erro ao cadastrar animal para adoção!

## prisma.schema exemple

``` Exemplo prisma.schema
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String    @id @default(uuid())
  name      String
  email     String    @unique
  cpf       String
  phone     String
  password  String
  address   Address?
}

model Address {
  id          String   @id @default(uuid())
  cep         String
  complement  String?
  userId      String?
  user        User?    @relation(fields: [userId], references: [id])
}

model AnimalFound {
  id                       String    @id @default(uuid())
  photo                    String
  local_encontrado         String
  species                  String
  race                     String
  age                      String
  color                    String
  size                     String
  distinctive_characteristics String
  userId                   String?
  user                     User?     @relation(fields: [userId], references: [id])
}

model LostAnimal {
  id                       String    @id @default(uuid())
  species                  String
  race                     String
  age                      String
  color                    String
  size                     String
  distinctive_characteristics String
  date_loss                String
  location_loss            String
  userId                   String?
  user                     User?     @relation(fields: [userId], references: [id])
}

model AvailableAnimal {
  id                       String    @id @default(uuid())
  species                  String
  race                     String
  age                      String
  color                    String
  size                     String
  distinctive_characteristics String
  informacoes_personalidade String
  userId                   String?
  user                     User?     @relation(fields: [userId], references: [id])
}

```

## Tabelas

Tabela User

| Coluna    | Tipo   | Restrições         |
|-----------|--------|--------------------|
| id        | UUID   | Chave primária     |
| name      | String | -                  |
| email     | String | Único, não nulo    |
| cpf       | String | -                  |
| phone     | String | -                  |
| password  | String | -                  |

Tabela Address

| Coluna       | Tipo   | Restrições         |
|--------------|--------|--------------------|
| id           | UUID   | Chave primária     |
| cep          | String | -                  |
| complement   | String | -                  |
| user_id      | UUID   | Chave estrangeira  |

Tabela AnimalFound

| Coluna                     | Tipo   | Restrições         |
|----------------------------|--------|--------------------|
| id                         | UUID   | Chave primária     |
| photo                      | String | -                  |
| local_encontrado           | String | -                  |
| species                    | String | -                  |
| race                       | String | -                  |
| age                        | String | -                  |
| color                      | String | -                  |
| size                       | String | -                  |
| distinctive_characteristics | String | -                |
| user_id                    | UUID   | Chave estrangeira  |

Tabela LostAnimal

| Coluna                     | Tipo   | Restrições         |
|----------------------------|--------|--------------------|
| id                         | UUID   | Chave primária     |
| species                    | String | -                  |
| race                       | String | -                  |
| age                        | String | -                  |
| color                      | String | -                  |
| size                       | String | -                  |
| distinctive_characteristics | String | -                |
| date_loss                  | String | -                  |
| location_loss              | String | -                  |
| user_id                    | UUID   | Chave estrangeira  |

Tabela AvailableAnimal

| Coluna                     | Tipo   | Restrições         |
|----------------------------|--------|--------------------|
| id                         | UUID   | Chave primária     |
| species                    | String | -                  |
| race                       | String | -                  |
| age                        | String | -                  |
| color                      | String | -                  |
| size                       | String | -                  |
| distinctive_characteristics | String | -                |
| informacoes_personalidade  | String | -                |
| user_id                    | UUID   | Chave estrangeira  |

## Selos de Resgatadores e Perfis Verificados

A adição de selos de resgatadores e selos de perfil verificado pode ser implementada para fornecer confiança e credibilidade aos usuários do sistema. Aqui estão algumas sugestões de como implementar esses selos:

- Os usuários podem solicitar o selo de resgatador, fornecendo evidências de seu trabalho de resgate de animais.
- A equipe do sistema revisará as evidências fornecidas e, se aprovadas, concederá o selo de resgatador ao usuário.
- Os usuários também podem solicitar o selo de perfil verificado, fornecendo documentos de identificação ou outras informações que comprovem sua identidade.
- A equipe do sistema verificará as informações fornecidas e, se confirmadas, concederá o selo de perfil verificado ao usuário.

**Selo de Resgatador**
Esse selo pode ser atribuído a usuários que têm um histórico de resgate de animais.
Os critérios para obter o selo podem incluir o número de animais resgatados, o envolvimento em organizações de resgate de animais ou qualquer outra métrica relevante.
O selo de resgatador pode ser exibido ao lado do nome do usuário em seu perfil ou em qualquer outra seção do sistema onde o usuário é mencionado.

**Selo de Perfil Verificado**
Esse selo pode ser usado para indicar que o perfil do usuário foi verificado e está autenticado.
A verificação pode ser realizada por meio de informações como número de telefone, e-mail verificado ou outra forma de autenticação.
O selo de perfil verificado pode ser exibido no perfil do usuário, mostrando aos outros usuários que o perfil passou por um processo de verificação.

## Considerações Finais

Este README fornece uma visão geral das rotas, queries e estrutura do banco de dados para o projeto **Back To Me**. Utilize essas informações como referência para desenvolver e testar as funcionalidades do sistema.
