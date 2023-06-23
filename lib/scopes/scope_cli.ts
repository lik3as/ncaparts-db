"use strict"
import {ScopesOptionsGetter} from './scope-types'
import db from '../models/index';
import {FindOptions, Op} from 'sequelize'

const sequelize = db;

export const cli_scopes: ScopesOptionsGetter = () => ({ 
    find_by_unique(email: string): FindOptions{
      return{
        where: {
          email: {
            [Op.like]: email
          }
        }
      }
    },
})
