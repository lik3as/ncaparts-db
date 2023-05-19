import sequelize, { Produto, Tipo, Subtipo, Marca, Modelo, Versao } from "../models/index";
import IFab, {param_body, param_bodies, body} from '../contracts/IServices'

type categorias = Tipo[] | Subtipo[] | Marca[] | Modelo[] | Versao[];
type categoria_p = Tipo | Subtipo | Marca | Modelo | Versao;
type categoria = typeof Tipo | typeof Subtipo | typeof Marca | typeof Modelo | typeof Versao;

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

  public async createCategoria(categoria: string, body: {}[] | {}): Promise<categorias | categoria_p>{
    switch(categoria){
      case ('Tipo'):
      case('Tipos'): {
        const filtered = await this.filterCatUniques(body, Tipo)

        if (Array.isArray(filtered)){
          return await Tipo.bulkCreate(filtered)
        } else {
          return await Tipo.create(filtered);
        }  
      }
      case ('Subtipo'):
      case('Subtipos'): {
        const filtered = await this.filterCatUniques(body, Subtipo)

        if (Array.isArray(filtered)){
          return await Subtipo.bulkCreate(filtered)
        } else {
          return await Subtipo.create(filtered);
        }  
      }
      case ('Marca'):
      case('Marcas'): {
        const filtered = await this.filterCatUniques(body, Marca)

        if (Array.isArray(filtered)){
          return await Marca.bulkCreate(filtered)
        } else {
          return await Marca.create(filtered);
        }   
      }
      case ('Modelo'):
      case ('Modelos'): {
        const filtered = await this.filterCatUniques(body, Modelo)

        if (Array.isArray(filtered)){
          return await Modelo.bulkCreate(filtered)
        } else {
          return await Modelo.create(filtered);
        }   
      }
      case ('Versao'):
      case ('Versaos'): {
        const filtered = await this.filterCatUniques(body, Versao)

        if (Array.isArray(filtered)){
          return await Versao.bulkCreate(filtered)
        } else {
          return await Versao.create(filtered);
        }   
      }
      default: 
        throw new Error(categoria + " it's not a table.");
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

  private async filterCatUniques(body: {}[] | {}, cats:  categoria): Promise<{} | {}[]>{
    if (Array.isArray(body)){
      const filtered_map = await Promise.all(
        body.map(async (cat) => {
          (await cats.findOne({
            where: {
              nome: cat.nome
            }
          })) == null
        })
      )

      return body.filter((_, i) => filtered_map[i])
    } else {
      const cattable = await cats.findOne({
        where: {
          nome: (body as any).nome
        }
      })
      return (cattable == null) ? body : cattable;
    }
  }
}