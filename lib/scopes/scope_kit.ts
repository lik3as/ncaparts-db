import { ScopesOptionsGetter, find } from "./scope-types";
import { Op } from "sequelize";

export const kit_scopes: ScopesOptionsGetter = () => ({
  find_by_unique(apelido: string): find {
    return {
      where: {
        apelido: {
          [Op.like]: apelido
        }
      }
    }
  }
})