import { Kit } from "../models/index";
import IFab, {param_body, param_bodies, body} from '../contracts/IServices'


export default class KitCtrl implements IFab<Kit>{
  constructor(){ }

  async getAttr(name: string): Promise<Kit[]> {
    return await Kit.findAll({attributes: [name]});
  }

  async createOne(body: {}): Promise<Kit> {
    return await Kit.create(body);
  }
  async createMany(bodies: {}[]): Promise<Kit[]> {
    return await Kit.bulkCreate(bodies);
  }

  public async getBodies({method, on, args}: param_bodies) : body<Kit[]> { 
    return (typeof args == undefined ) ?
     Kit.scope(
      {method: `${method}${on}`}
      ).findAll()
      :
      Kit.scope(
      {method: [`${method}${on}`, args]}
      ).findAll()
  }

  public async getBody({ method, on, args }: param_body): body<Kit> {
    if (method!='find_by_')
      throw new Error("Este método retorna uma lista.");
    return Kit.scope(
      {method: [`${method}${on}`, args]}
      ).findOne()
  }

  static get skeleton(){
    return Kit;
  }
}

