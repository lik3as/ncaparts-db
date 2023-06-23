import { Marca, Modelo, Produto, Subtipo, Tipo, Versao } from "../models";
import { ScopesOptionsGetter} from "./scope-types";
import { FindOptions, IncludeOptions, Op, or } from "sequelize";

export const merc_scopes: ScopesOptionsGetter = () => ({
  find_by_unique(nome: string): FindOptions {
    return{
      where: {
        nome: {
          [Op.like]: nome
        }
      }
    }
  },
  join_in_prod(sku: string): FindOptions & IncludeOptions {
    return {
      include: [{
        model: Produto,
        required: true,
        where: {
          sku: {
            [Op.like]: sku
          },
        },
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
      }]
    }
  },
  
})