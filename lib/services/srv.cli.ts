import sequelize, { Cliente } from "../models/index";
import IFab, {param_body, param_bodies, body} from '../contracts/IServices'

export default class ClienteCtrl implements IFab<Cliente>{
  constructor(){}

  async getAttr(name: string): Promise<Cliente[]> {
    return await Cliente.findAll({attributes: [name]});
  }


  async filterUniques(body: Object[] | Object): Promise<Object | Object[] | null> {
    if (Array.isArray(body)){
      const filtered_map = await Promise.all(
        body.map(async (bdy) => {
          //Verifica se não há nenhuma ocorrência deste email no banco de dados
          return (await this.getBody({ method: 'find_by_', on: 'unique', args: bdy.email })) == null;
        })
      );   

      return body.filter((_, i) => filtered_map[i]);   
    } else {
      const cli = (await this.getBody({method: 'find_by_', on: 'unique', args: (body as any).email}))
      return cli == null
      ?
      body
      :
      null;
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
     await Cliente.scope(
      {method: `${method}${on}`}
      ).findAll()
      :
      await Cliente.scope(
      {method: [`${method}${on}`, args]}
      ).findAll()
  }

  public async getBody({ method, on, args }: param_body): body<Cliente> {
    if (method!='find_by_')
      throw new Error("Este método retorna uma lista.");
    return await Cliente.scope(
      {method: [`${method}${on}`, args]}
      ).findOne()
  }

  public async getAllBodies(): Promise<Cliente[]> {
    return await Cliente.findAll({
      order: [
        sequelize.fn('concat', sequelize.col('nome'))
      ]
    });
  }

  static get skeleton(){
    return Cliente;
  }

}