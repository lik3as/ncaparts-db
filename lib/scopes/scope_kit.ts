import { ScopesOptionsGetter } from "./scope-types";
import { FindOptions, Op } from "sequelize";

export const kit_scopes: ScopesOptionsGetter = () => ({
  find_by_unique(apelido: string): FindOptions {
    return {
      where: {
        apelido: {
          [Op.like]: apelido
        }
      }
    }
  }
})