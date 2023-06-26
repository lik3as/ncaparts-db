import db, { Kit, Marca, Modelo, Produto, Subtipo, Tipo, Versao } from "../models";
import { ScopesOptionsGetter } from "./scope-types";
import { FindOptions, IncludeOptions, Op } from "sequelize";

export const merc_scopes: ScopesOptionsGetter = () => ({
  find_by_unique(id_prod: number): FindOptions {
    return {
      where: {
        id_produto: {
          [Op.eq]: id_prod
        }
      }
    }
  },
  join_in_prod(sku: string): FindOptions & IncludeOptions {
    return {
      attributes: ['id', 'valor_real', 'valor_real_revenda', 'skus_relacionados', 'importada', 'disponivel', 'nome'],
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
        }, {
          model: Tipo,
          as: 'tipo',
          attributes: ['id', 'nome']
        }, {
          model: Subtipo,
          as: 'subtipo',
          attributes: ['id', 'nome']
        }, {
          model: Marca,
          as: 'marca',
          attributes: ['id', 'nome']
        }, {
          model: Modelo,
          as: 'modelo',
          attributes: ['id', 'nome']
        }, {
          model: Versao,
          as: 'versao',
          attributes: ['id', 'nome']
        }],
      }]
    }
  },
  find_by_related(sku: string): FindOptions & IncludeOptions {
    const sequelize = db
    return {
      where: sequelize.literal(`'${sku}' = ANY(skus_relacionados)`),
      include: [{
        model: Produto,
        as: 'produto',
        attributes: ['id', 'sku', 'final', 'desc', 'imagens'],
        include: [{
          model: Produto,
        }, {
          model: Tipo,
          as: 'tipo',
          attributes: ['id', 'nome']
        }, {
          model: Subtipo,
          as: 'subtipo',
          attributes: ['id', 'nome']
        }, {
          model: Marca,
          as: 'marca',
          attributes: ['id', 'nome']
        }, {
          model: Modelo,
          as: 'modelo',
          attributes: ['id', 'nome']
        }, {
          model: Versao,
          as: 'versao',
          attributes: ['id', 'nome']
        }],
      }, {
        model: Kit,
        as: 'kit'
      }],
    }
  },
  find_by_name(name: string): FindOptions & IncludeOptions {
    return {
      where: {
        nome: {
          [Op.iLike]: `%${name}%`
        }
      },
      include: [{
        model: Produto,
        as: 'produto',
        attributes: ['id', 'sku', 'final', 'desc', 'imagens'],
        include: [{
          model: Produto,
        }, {
          model: Tipo,
          as: 'tipo',
          attributes: ['id', 'nome']
        }, {
          model: Subtipo,
          as: 'subtipo',
          attributes: ['id', 'nome']
        }, {
          model: Marca,
          as: 'marca',
          attributes: ['id', 'nome']
        }, {
          model: Modelo,
          as: 'modelo',
          attributes: ['id', 'nome']
        }, {
          model: Versao,
          as: 'versao',
          attributes: ['id', 'nome']
        }],
      }, {
        model: Kit,
        as: 'kit'
      }],
    }
  }
})