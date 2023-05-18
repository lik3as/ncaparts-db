import { Fabricante } from "../models/index";
import IFab, {param_body, param_bodies, body} from '../contracts/IServices'


export default class FabricanteCtrl implements IFab<Fabricante>{
  constructor(){ }

  async filterUniques(body: Object[] | Object): Promise<Object | Object[] | null> {
    if (Array.isArray(body)){
      const repeated_map = await Promise.all(
        body.map(async (fab: any) => {
          return (await this.getBody({method: 'find_by_', on: 'unique', args: fab.cnpj}) == null)
        })
      )

      return body.filter((_, i) => repeated_map[i]);
    } else {
        return (await this.getBody({method: 'find_by_', on: 'unique', args: (body as any).cnpj}))
    }
  }

  async getAttr(name: string): Promise<Fabricante[]> {
    return await Fabricante.findAll({attributes: [name]});
  }

  async createOne(body: {}): Promise<Fabricante> {
    return await Fabricante.create(body);
  }

  async createMany(bodies: {}[]): Promise<Fabricante[]> {
    return await Fabricante.bulkCreate(bodies);
  }

  public async getBodies({method, on, args}: param_bodies) : body<Fabricante[]> { 
    return (typeof args == undefined ) ?
     await Fabricante.scope(
      {method: `${method}${on}`}
      ).findAll()
      :
      await Fabricante.scope(
      {method: [`${method}${on}`, args]}
      ).findAll()
  }

  public async getBody({ method, on, args }: param_body): body<Fabricante> {
    console.log(method + on + `(${args})`)
    if (method!='find_by_')
      throw new Error("Este método retorna uma lista.");
    return await Fabricante.scope(
      {method: [`${method}${on}`, args]}
      ).findOne()
  }

  static get skeleton(){
    return Fabricante;
  }
}
