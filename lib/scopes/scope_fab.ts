import {join, find, ScopesOptionsGetter} from './scope-types'
import db from '../models/index';
import {ProdFab} from '../models/index'
import {Op} from 'sequelize'

const sequelize = db;

export const fab_scopes: ScopesOptionsGetter = () => ({ 
    find_by_id(id: number): find{
      return{
        where: {
          id: {
            [Op.eq]: id
          }
        }
      }
    },
    find_by_unique(cnpj: string): find{
      return {
        where: {
          cnpj: {
            [Op.like]: cnpj
          }
        }
      }
    },
    /* 
    * @param fk_prod -> foreign key da tabela associativa
    */
    join_in_prod(fk_prod: number): join{
      return {
        include: [{
          model: ProdFab,
          required: true,
          where: {
            id: {
              [Op.eq]: sequelize.literal(
                `SELECT id_fab FROM ProdFab
                 WHERE id_prod = ${fk_prod};`
            )}
          }
        }]
      }
    } 
})
