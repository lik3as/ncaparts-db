import {Sequelize} from 'sequelize-typescript';
import prod_db from '../config/config';
import { Cliente } from './cliente';
import { Venda } from './venda';
import { Fabricante } from './fabricante';
import { Kit } from './kit';
import { Logistica } from './logistica';
import { Marca } from './marca';
import { Mercadoria } from './mercadoria';
import { Modelo } from './modelo';
import { ProdFab } from './prod_fab';
import { ProdKit } from './prod_kit';
import { Produto } from './produto';
import { Subtipo } from './subtipo';
import { Versao } from './versao';
import { Tipo } from './tipo';


class Database{
  public sequelize: Sequelize;

  constructor() {
    this.connect();
    this.sequelize.authenticate().then(() => {
      console.log('\n\x1b[35mDatabase was connected with Success!\x1b[0m')
    }).catch(err => {
      console.log(err)
    });
  }

  private connect(): void{
    try{
      this.sequelize = new Sequelize(prod_db.production.database, prod_db.production.username,  prod_db.production.password, {
        host: prod_db.production.host,
        dialect: prod_db.production.dialect,
        port: prod_db.production.port as number,
        logging: sql => {
          console.log(`SQL: \x1b[32m ${sql} \x1b[0m`)
        }
      });
    } catch (e){
      console.log(e);
    } 

  }

  public async delaySync(sequelize: Sequelize, {after, alter = false, force = false}: sync_param){
    for (let i: number = after; i > 0; i--){
        console.log('Synchronizing in ' + i);
        await new Promise(res => setTimeout(res, 1000)); 
    }
    sequelize.sync({
        force: force,
        alter: alter,
        logging: sql => {
            console.log(`SQL \x1b[35mSYNC\x1b[0m: \x1b[33m ${sql} \x1b[0m`)
        }
    });
  }
}

const db: Database = new Database();

db.sequelize.addModels([
  Cliente, Venda, Fabricante, Kit, Logistica, Marca, Mercadoria, Modelo,
  ProdFab, ProdKit, Produto, Subtipo, Versao, Tipo 
]);

export default db.sequelize;

export const delaySync = db.delaySync;

export {
  Cliente, Venda, Fabricante, Logistica, Marca, Mercadoria, Modelo,
  ProdFab, ProdKit, Produto, Subtipo, Versao, Tipo, Kit
}


interface sync_param{
  after: number,
  alter?: boolean,
  force?: boolean
}