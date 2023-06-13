import { Produto } from "../models";
import { ScopesOptionsGetter, find, join } from "./scope-types";
import { Op } from "sequelize";

export const merc_scopes: ScopesOptionsGetter = () => ({
  find_by_unique(nome: string): find {
    return{
      where: {
        nome: {
          [Op.like]: nome
        }
      }
    }
  },
  join_in_prod(sku: string): find & join {
    return {
      include: [{
        model: Produto,
        required: true,
        where: {
          sku: {
            [Op.like]: sku
          }
        }
      }]
    }
  }
})