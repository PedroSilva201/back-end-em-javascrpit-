## Atividade de Avaliação 1 - Node, Heroku e ElephantSQL

#### Objetivos:

- Usar o pacote Express para criar um servidor;
- Definir rotas;
- Restrição de acesso usando JWT (JSON Web Token);
- Uso do ORM Sequelize (Object-Relational Mapper) para persistir os dados no BD;
- Banco de dados PostgreSQL na cloud ElephantSQL;
- Deploy da aplicação Node no Heroku.

#### Descrição da atividade

Fazer uma aplicação Node para manter o cadastro de usuários e seus registros de vacina.
Requisitos:

1. O usuário efetua o seu próprio cadastro;
2. O usuário efetua login;
3. O usuário altera mail e senha;
4. O e-mail é único;
5. Existem os perfis de usuário user e admin;
6. O usuário admin possui a função de cadastrar, editar, excluir e listar as vacinas;
7. O usuário com perfil user não pode cadastrar, excluir e atualizar vacinas;
8. Somente o usuário admin pode mudar o perfil de acesso de outros usuários;
9. O usuário registra que foi vacinado fornecendo a identificação da vacina e a data no formato YYYY-MM-DD;
10. O usuário pode editar e excluir os seus registros de vacinação;
11. O usuário pode listar os registros de vacina em ordem decrescente de data;
12. O usuário possui acesso a somente os seus próprios registros de vacinação;
13. Todas as operações requerem login;
14. Os dados precisam ser persistidos no SGBD PostreSQL da cloud ElephantSQL;
15. Fazer deploy da aplicação na cloud do Heroku.

#### Modelo de dados da aplicação

![](https://github.com/arleysouza/node-routes-jwt/blob/main/images/modelo.png)

#### Pré-requisitos

1. Node.js;
2. Visual Studio Code;
3. Insomnia para testar as URLs do servidor;
4. Conta no ElephantSQL (https://www.elephantsql.com/);
5. Conta no Heroku (https://id.heroku.com/login).

#### Criar o projeto

1. Faça o clone do projeto no computador na pasta `server`:

```
git clone https://github.com/arleysouza/node-routes-jwt.git server
```

2. Instalar as dependências do `package.json`:

```
cd server
npm install
```

3. Rodar o projeto em ambiente de desenvolvimento:

```
npm run dev
```

4. Rodar o projeto em ambiente de produção:

```
npm run start
```

#### Ferramenta ESLint

É necessário ter instalado o eslint como dependência de desenvolvimento:
`npm i eslint -D` ou `yarn add eslint -D`

Para inicializar o nosso ambiente eslint criando o arquivo `.eslintrc.json` foi criado usando a configuração básica a seguir.

```
npx eslint --init
√ How would you like to use ESLint? · style
√ What type of modules does your project use? · commonjs
√ Which framework does your project use? · none
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · node
√ How would you like to define a style for your project? · prompt
√ What format do you want your config file to be in? · JSON
√ What style of indentation do you use? · tab
√ What quotes do you use for strings? · double
√ What line endings do you use? · unix
√ Do you require semicolons? · No / Yes
```

O ESLint é usando para dar dicas sobre problemas na padronização do código, mas podemos usar
as extensões no VS Code:

1. Prettier - Code formatter para formatar o código ao digitar e salvar;
2. EditorConfig para indicar os parâmetros de formatação do código.

É necessário também adicionar a seguinte propriedade no arquivo de preferências "Open settings" do VS Code. Pressione `<Ctrl><Shift><p>` e digite `settings` para localizar o arquivo de preferências no VS Code e adicone a propriedade `"editor.formatOnSave": true` no arquivo JSON.

Para mais detalhes recomenda-se assistir:
[Eslint para iniciantes](https://www.youtube.com/watch?v=i26sZrPj2zY) e
[Sytle guides JavaScript com ESLint, Prettier e EditorConfig](https://www.youtube.com/watch?v=TI4v4Y8yRjw).
