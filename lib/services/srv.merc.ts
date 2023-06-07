import { Mercadoria, Produto, Kit } from "../models/index";
import IFab, {param_body, param_bodies, body} from '../contracts/IServices'


export default class MercadoriaCtrl implements IFab<Mercadoria>{
  constructor(){ }

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
      attributes: ['id', 'v_real', 'v_real_revenda', 'sku', 'importado'],
      include: [{
        model: Produto,
        as: 'produto',
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

  async records(): Promise<number> {
    return await Mercadoria.count();
  }

}

