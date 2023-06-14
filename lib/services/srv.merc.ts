import { Mercadoria, Produto, Kit, Tipo, Subtipo, Marca, Modelo, Versao } from "../models/index";
import IFab, {param_body, param_bodies, body} from '../contracts/IServices'


export default class MercadoriaCtrl implements IFab<Mercadoria>{
  constructor(){ }

  async filterUniques(body: Object[] | Object): Promise<Object | Object[] | null> {
    if (Array.isArray(body)) {
      const filtered_map = await Promise.all(
        body.map(async (merc) => {
          return (await this.getBody({method: 'find_by_', on: 'unique', args: merc.nome})) == null;
        })
      )

      return body.filter((_, i) => filtered_map[i]);
    } else {
      const merc = await this.getBody({method: 'find_by_', on: 'unique', args: (body as any).nome});
      return merc == null
      ?
      body
      :
      null;
    }

  }

  async getAttr(name: string): Promise<Mercadoria[]> {
    return await Mercadoria.findAll({attributes: [name]});
  }

  async createOne(body: {}): Promise<Mercadoria> {
    return await Mercadoria.create(body);
  }

  async createMany(bodies: {}[]): Promise<Mercadoria[]> {
    return await Mercadoria.bulkCreate(bodies);
  }

  async getOffsetBodies(limit: number, pageOffset: number): Promise<Mercadoria[]> {
    return await Mercadoria.findAll({
      attributes: ['id', 'valor_real', 'valor_real_revenda', 'skus_relacionados', 'importada', 'disponivel', 'nome'],
      include: [{
        model: Produto,
        as: 'produto',
        attributes: ['id', 'sku', 'final', 'desc', 'imagens'],
        include: [{
          model: Produto,
        },{
          model: Tipo,
          as: 'tipo',
          attributes: ['id', 'nome']
        },{
          model: Subtipo,
          as: 'subtipo',
          attributes: ['id', 'nome']
        },{
          model: Marca,
          as: 'marca',
          attributes: ['id', 'nome']
        },{
          model: Modelo,
          as: 'modelo',
          attributes: ['id', 'nome']
        },{
          model: Versao,
          as: 'versao',
          attributes: ['id', 'nome']
        }],
      }, {
        model: Kit,
        as: 'kit'
      }],
      subQuery: false,
      limit: limit,
      offset: (limit * pageOffset)
    });
  }

  public async getBodies({method, on, args}: param_bodies) : body<Mercadoria[]> { 
    return (typeof args == undefined ) ?
     Mercadoria.scope(
      {method: `${method}${on}`}
      ).findAll()
      :
      Mercadoria.scope(
      {method: [`${method}${on}`, args]}
      ).findAll()
  }

  public async getBody({ method, on, args }: param_body): body<Mercadoria> {
    if (method!='find_by_')
      throw new Error("Este método retorna uma lista.");
    return Mercadoria.scope(
      {method: [`${method}${on}`, args]}
      ).findOne()
  }

  static get skeleton() {
    return Mercadoria;
  }

  async update(body: Object) {
    try{
      return await (Mercadoria.update(body, {
        where: {
          nome: (body as any).nome
        }
      }));
    }
    catch(e){
      throw new Error('An error ocurred while trying to update Mercadorias table.');
    }
  }

  async records(): Promise<number> {
    return await Mercadoria.count();
  }

}

