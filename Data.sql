CREATE TABLE "Users" (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE "Recipe" (
  id  UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title       VARCHAR(255),
  description TEXT,
  ingredients TEXT[],
  steps       TEXT[],
  "authorId"    UUID REFERENCES "Users"(id),
  "createdAt"   TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"   TIMESTAMPTZ
);


CREATE TABLE "Favorite" (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "userId"    UUID REFERENCES "Users"(id),
  "recipeId"  UUID REFERENCES "Recipe"(id),
  CONSTRAINT uc_user_recipe UNIQUE ("userId", "recipeId")
);

CREATE TABLE "Comment" (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  text      TEXT,
  "userId"    UUID REFERENCES "Users"(id),
  "recipeId"  UUID REFERENCES "Recipe"(id)
);

select * from "Recipe";
CREATE TABLE "Categories" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  url VARCHAR(100) NOT NULL
);

INSERT INTO "Categories" (id, name, url)
VALUES 
  (gen_random_uuid(), 'Carnes', 'carnes'),
  (gen_random_uuid(), 'Aves', 'aves'),
  (gen_random_uuid(), 'Peixes', 'peixes'),
  (gen_random_uuid(), 'Frutos', 'frutos'),
  (gen_random_uuid(), 'Bolos', 'bolos'),
  (gen_random_uuid(), 'Sobremesas', 'sobremesas'),
  (gen_random_uuid(), 'Molhos', 'molhos'),
  (gen_random_uuid(), 'Outros', 'outros');


select * from "Categories";

-- Receitas para a categoria "Carnes"
INSERT INTO "Recipe" (id, title, description, ingredients, steps, "authorId")
VALUES 
  (gen_random_uuid(), 'Churrasco de Picanha', 'Delicioso churrasco de picanha', 
   ARRAY['1 peça de picanha', 'Sal grosso a gosto'], 
   ARRAY['Prepare o fogo na churrasqueira...', 'Coloque a picanha na grelha com a gordura para cima...', 'Espalhe o sal grosso por toda a carne...', 'Deixe assar por alguns minutos de cada lado...', 'Retire a picanha da churrasqueira e deixe descansar por alguns minutos...', 'Corte em fatias e sirva quente...'], 
   '0c7db87b-efd2-481c-8887-4e08b4df45fd');
   
-- Receitas para a categoria "Aves"
INSERT INTO "Recipe" (id, title, description, ingredients, steps, "authorId")
VALUES 
  (gen_random_uuid(), 'Frango Assado com Batatas', 'Frango assado suculento com batatas', 
   ARRAY['1 frango inteiro', 'Batatas cortadas em rodelas', 'Azeite de oliva', 'Temperos a gosto'], 
   ARRAY['Limpe o frango e retire o excesso de gordura...', 'Tempere o frango com os temperos de sua preferência...', 'Coloque o frango em uma assadeira e adicione as batatas cortadas em rodelas...', 'Regue tudo com azeite de oliva...', 'Asse em forno pré-aquecido por algumas horas, ou até que o frango esteja dourado e cozido por completo...', 'Sirva o frango assado com as batatas...'], 
   '0c7db87b-efd2-481c-8887-4e08b4df45fd');

-- Insira mais receitas fictícias para as outras categorias
