import {join, find, ScopesOptionsGetter} from './scope-types'
import db from '../models/index';
import {Cliente} from '../models/index'
import {Op} from 'sequelize'

const sequelize = db;

export const cli_scopes: ScopesOptionsGetter = () => ({ 
    find_by_unique(email: string): find{
      return{
        where: {
          email: {
            [Op.like]: email
          }
        }
      }
    },
})
