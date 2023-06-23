import {ScopesOptionsGetter } from './scope-types'
import db from '../models/index'
import { Produto, Tipo, Subtipo, Marca, Modelo, Mercadoria, Versao } from '../models/index'
import { FindOptions, IncludeOptions, Includeable, Op } from 'sequelize'

const sequelize = db;
export const prod_scopes: ScopesOptionsGetter = () => (
  {
    find_by_unique(sku: string): FindOptions {
      return {
        where: {
          sku: {
            [Op.like]: sku
          }
        }
      }
    },
    find_by_id(id: number): FindOptions {
      return {
        where: {
          id: {
            [Op.eq]: id
          }
        }
      }
    },
    join_in_prod(is_final_prod: boolean): FindOptions & IncludeOptions{
      return {
        include: [{
          model: Produto,
          required: true,
          where: {
            final: {
              [Op.eq]: is_final_prod
            }
          }
        }]
      }
    },
    join_in_tipo(fk_tipo: number): FindOptions & IncludeOptions{
      return {
        include: [{
          model: Tipo,
          required: true,
          where: {
            id_tipo: {
              [Op.eq]: fk_tipo
            }
          }
        }]
      }
    },
    join_in_subtipo(fk_subtipo: number): FindOptions & IncludeOptions{
      return {
        include: [{
          model: Subtipo,
          required: true,
          where: {
            id_subtitpo: {
              [Op.eq]: fk_subtipo
            }
          }
        }]
      }
    },
    join_in_marca(fk_marca: number): FindOptions & IncludeOptions {
      return {
        include: [{
          model: Marca,
          required: true,
          where: {
            id_marca: {
              [Op.eq]: fk_marca
            }
          }
        }]
      }
    },
    join_in_modelo(fk_modelo: number): FindOptions & IncludeOptions{
      return {
        include: [{
          model: Modelo,
          required: true,
          where: {
            id_modelo: {
              [Op.eq]: fk_modelo
            }
          }
        }]
      }
    },
    join_in_versao(fk_vers: number): FindOptions & IncludeOptions {
      return {
        include: [{
          model: Versao,
          required: true,
          where: {
            id_vers: { [Op.eq]: fk_vers }
          }
        }]
      }
    },
    join_in_categories(nome_tipo: string, nome_subtipo: string,
      nome_marca: string, nome_modelo: string): FindOptions & IncludeOptions {
      return {
        include: [{
          model: Tipo,
          required: true,
          where: {
            id_tipo: {
              [Op.eq]: sequelize.literal(
                `SELECT id FROM Tipo ` +
                `WHERE nome = ${nome_tipo};`
              )
            }
          }
        }, {
          model: Subtipo,
          required: true,
          where: {
            id_subtipo: {
              [Op.eq]: sequelize.literal(
                `SELECT id FROM Subtipo ` +
                `WHERE nome = ${nome_subtipo};`
              )
            }
          }
        }, {
          model: Marca,
          required: true,
          where: {
            id_marca: {
              [Op.eq]: sequelize.literal(
                `SELECT id FROM Marca ` +
                `WHERE nome = ${nome_marca};`
              )
            }
          }
        }, {
          model: Modelo,
          required: true,
          where: {
            id_modelo: {
              [Op.eq]: sequelize.literal(
                `SELECT id FROM Modelo ` +
                `WHERE nome = ${nome_modelo};`
              )
            }
          }
        }]
      }
    },
    join_in_merc(skus_relacionados: string): FindOptions & IncludeOptions {
      return {
        include: [{
          model: Mercadoria,
          as: 'mercadoria',
          where: {
            sku: {[Op.any]: `{${[skus_relacionados]}}`}
          }
        }]
      }
    }
  }
)
