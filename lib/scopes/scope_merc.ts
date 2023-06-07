import { ScopesOptionsGetter, find } from "./scope-types";
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
  }
})