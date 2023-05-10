## NCA parts REST application
### 📥 Installation 
```
npm install ncaparts-ctrl
```
ou (linux)
```
npm install https://github.com/lik3as/ncaparts-ctrl
cd .. & git clone https://github.com/lik3as/ncaparts-ctrl
cd ncaparts-ctrl & npx tsc (ou babel)
cp dist ../<seu_projeto>/node_modules/ncaparts-ctrl/ 
```
***Não é recomendado utilizar o babel para este projeto sequelize-typescript***

### 🚀 Uso 
### ⚙ Configurar
- Babel: todo
- tsc:
1. Em ```compilerOptions```, defina ```"experimentalDecorators": true``` e ```"emitDecoratorMetadata": true```.<br>Essas opções irão habilitar os decorators e a inferência de tipo pelo sequelize-typescript.

2. Ainda em ```compilerOptions```, defina ```strictPropertyInitialization: false```.
Isso fará com que o typescript não reclame de atributos de classes não inicializados.

3. Adicione um arquivo .env no seu diretório ```src/``` contendo os dados do banco de dados da seguinte maneira:

```
NODE_ENV=<ambiente>
DB_PROD_USERNAME=<nome_do_usuário>
DB_PROD_PASSWORD=<senha_do_usuário>
DB_PROD_DATABASE=<nome_do_bd>
DB_PROD_HOSTNAME=<nome_do_host>
DB_PROD_PORT=<porta>
```

#### ➕ Adicionar uma nova entidade
1. Modele no arquivo disponibilizado pelo criador do repositório
2. Defina a entidade como tabela no diretório ```models/```
3. Exporte ela direto do arquivo ```models/index.ts```

#### 🛠 Controller para o seu novo Model
1. Crie um novo arquivo de escopo na pasta ```scopes/```
2. Adicione nele os seus métodos de escopos, nomeando seguindo o padrão indicado no arquivo ```scopes/scope-types.ts```
3. Adicione o nome do seu model ao tipo ```method_specific```
4. Crie o arquivo de controller no diretório ```controllers/``` e implemente a interface em ```contracts/IControllers.ts```
