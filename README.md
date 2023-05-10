## NCA parts REST application
### 📥 Installation 
```
npm install ncaparts-ctrl
npm install https://github.com/lik3as/ncaparts-ctrl
```
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
