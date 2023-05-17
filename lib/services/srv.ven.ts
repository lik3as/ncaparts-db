import { Venda } from "../models/index";
import IFab, {param_body, param_bodies, body} from '../contracts/IServices'


export default class VendaCtrl implements IFab<Venda>{
  constructor(){ }

  async createOne(body: {}): Promise<Venda> {
    return await Venda.create(body);
  }

  async createMany(bodies: {}[]): Promise<Venda[]> {
    return await Venda.bulkCreate(bodies);
  }

  public async getBodies({method, on, args}: param_bodies) : body<Venda[]> { 
    return (typeof args == undefined ) ?
     Venda.scope(
      {method: `${method}${on}`}
      ).findAll()
      :
      Venda.scope(
      {method: [`${method}${on}`, args]}
      ).findAll()
  }

  public async getBody({ method, on, args }: param_body): body<Venda> {
    if (method!='find_by_')
      throw new Error("Este método retorna uma lista.");
    return Venda.scope(
      {method: [`${method}${on}`, args]}
      ).findOne()
  }

  static get skeleton() {
    return Venda;
  }
}

