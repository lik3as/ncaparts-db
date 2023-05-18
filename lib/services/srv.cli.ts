import sequelize, { Cliente } from "../models/index";
import IFab, {param_body, param_bodies, body} from '../contracts/IServices'

export default class ClienteCtrl implements IFab<Cliente>{
  constructor(){}

  async getAttr(name: string): Promise<Cliente[]> {
    return await Cliente.findAll({attributes: [name]});
  }

  async filterUniques(body: Object[] | Object): Promise<Object | Object[] | null> {
    let emails: string[] = [];
    (await this.getAttr('email')).forEach((cli, i, arr) => {
      emails.push(cli.email);
    })
    if (Array.isArray(body)){
      return body.filter((bdy) => !emails.includes(bdy.email))
    } else {
      return (emails.includes((body as any).email)) ? null : body;
    }
  }


  async createOne(body: {}): Promise<Cliente> {
    return await Cliente.create(body);
  }
  async createMany(bodies: {}[]): Promise<Cliente[]> {
    return await Cliente.bulkCreate(bodies);
  }

  public async getBodies({method, on, args}: param_bodies) : body<Cliente[]> { 
    return (typeof args == undefined ) ?
     Cliente.scope(
      {method: `${method}${on}`}
      ).findAll()
      :
      Cliente.scope(
      {method: [`${method}${on}`, args]}
      ).findAll()
  }

  public async getBody({ method, on, args }: param_body): body<Cliente> {
    if (method!='find_by_')
      throw new Error("Este método retorna uma lista.");
    return Cliente.scope(
      {method: [`${method}${on}`, args]}
      ).findOne()
  }

  public async getAllBodies(): Promise<Cliente[]> {
    return Cliente.findAll({
      order: [
        sequelize.fn('concat', sequelize.col('nome'))
      ]
    });
  }

  static get skeleton(){
    return Cliente;
  }

}