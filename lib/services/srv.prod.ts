import sequelize, { Produto, Tipo, Subtipo, Marca, Modelo, Versao, Mercadoria } from "../models/index";
import IFab, {param_body, param_bodies, body} from '../contracts/IServices'
type categorias = Tipo[] | Subtipo[] | Marca[] | Modelo[] | Versao[]

export default class ProdutoCtrl implements IFab<Produto>{
  constructor(){ }

  async filterUniques(body: Object[] | Object): Promise<Object | Object[] | null> {
    if (Array.isArray(body)) {
      const filtered_map = await Promise.all(
        body.map(async (prod) => {
          return (await this.getBody({method: 'find_by_', on: 'unique', args: prod.sku}) == null)
        })
      )

      return body.filter((_, i) => filtered_map[i]);
    } else {
      return (await this.getBody({method: 'find_by_', on: 'unique', args: (body as any).sku}));
    }
  }

  async getAttr(name: string): Promise<Produto[]> {
    return await Produto.findAll({attributes: [name]});
  }

  async createOne(body: {}): Promise<Produto> {
    return await Produto.create(body);
  }

  async createMany(bodies: {}[]): Promise<Produto[]> {
    return await Produto.bulkCreate(bodies)
  }

  public async getBodies({method, on, args}: param_bodies) : body<Produto[]> { 
    return (typeof args == undefined ) ?
     Produto.scope(
      {method: `${method}${on}`}
      ).findAll()
      :
      Produto.scope(
      {method: [`${method}${on}`, args]}
      ).findAll()
  }

  public async getBody({ method, on, args }: param_body): body<Produto> {
    if (method!='find_by_')
      throw new Error("Este método retorna uma lista.");
    return Produto.scope(
      {method: [`${method}${on}`, args]}
      ).findOne()
  }

  public async getAllBodies(): Promise<Produto[]>{
    return await Produto.findAll(
      {
        order: [
          sequelize.fn('concat', sequelize.col('id_tipo'), sequelize.col('id_subtipo'), sequelize.col('id_marca'), sequelize.col('id_modelo'), sequelize.col('id_versao')) 
        ]
      }
    )
  }

  public async createCategoria(categoria: string | undefined, body: {}): Promise<void>{
    switch(categoria){
      case ('Tipo'):
      case('Tipos'): {
        await Tipo.create(body);
        break;
      }
      case ('Subtipo'):
      case('Subtipos'): {
        await Subtipo.create(body);
        break;
      }
      case ('Marca'):
      case('Marcas'): {
        await Marca.create(body);
        break;
      }
      case ('Modelo'):
      case ('Modelos'): {
        await Modelo.create(body);
        break;
      }
      case ('Versao'):
      case ('Versaos'): {
        await Versao.create(body);
        break;
      }
      default: 
        throw new Error(categoria + " it's not a table.");
        break;
    }
  }

  public async getCategorias(categoria: string): Promise<categorias> {
    switch(categoria){
      case ('Tipo'):
      case('Tipos'): {
        return await Tipo.findAll();
      }
      case ('Subtipo'):
      case('Subtipos'): {
        return await Subtipo.findAll();
      }
      case ('Marca'):
      case('Marcas'): {
        return await Marca.findAll();
      }
      case ('Modelo'):
      case('Modelos'): {
        return await Modelo.findAll();
      }
      case ('Versao'):
      case('Versaos'): {
        return await Versao.findAll();
      }
      default:
        throw new Error(categoria + " it's not a table.");
    }
  }

  static get skeleton() {
    return Produto;
  }
}