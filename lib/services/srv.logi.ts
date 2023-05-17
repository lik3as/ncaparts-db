import { Logistica } from "../models/index";
import IFab, {param_body, param_bodies, body} from '../contracts/IServices'


export default class LogisticaCtrl implements IFab<Logistica>{
  constructor(){ }

  async createOne(body: {}): Promise<Logistica> {
    return await Logistica.create(body);
  }
  async createMany(bodies: {}[]): Promise<Logistica[]> {
    return await Logistica.bulkCreate(bodies);
  }

  public async getBodies({method, on, args}: param_bodies) : body<Logistica[]> { 
    return (typeof args == undefined ) ?
     Logistica.scope(
      {method: `${method}${on}`}
      ).findAll()
      :
      Logistica.scope(
      {method: [`${method}${on}`, args]}
      ).findAll()
  }

  public async getBody({ method, on, args }: param_body): body<Logistica> {
    if (method!='find_by_')
      throw new Error("Este método retorna uma lista.");
    return Logistica.scope(
      {method: [`${method}${on}`, args]}
      ).findOne()
  }

  static get skeleton() {
    return Logistica;
  }
}

