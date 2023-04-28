import { Fabricante } from '../models';
import { rel_fab, method } from '../scopes/scope-types'
import param from './MethodArgs'

/**
 * @type {generic_body} - This type is a generic type that can serve as any class
 * attributes
 */
export type generic_body<T> = Promise<T | null>
export default interface Ctrl<T>{

  /**
  *   @returns lista de registros da tabela de acordo com o método;
  *   @param method - Nome do método a ser utilizado:
  *   @param model_fab - Array contendo o nome do modelo e o argumento passado ao
  *   parâmetro do método
  */
  getBodies({method, model_fab}: param): generic_body<T[]>;
  getBody({method, model_fab}: param): generic_body<T>;
}

export {method, param};