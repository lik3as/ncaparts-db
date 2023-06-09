import { FindOptions, IncludeOptions, Includeable, ModelOptions } from "sequelize";
import { Literal } from "sequelize/types/utils";


declare type ScopesOptions = find |  find & join | join | ((...args: any[]) => join | find | find & join);
export declare type ScopesOptionsGetter = () => {
    [sopeName: string]: ScopesOptions;
};

export declare function Scopes(scopesGetter: ScopesOptionsGetter): Function;


export type method_specific = 'prod' | 'fab' | 'logi' | 'tipo' | 'subtipo' |
'marca' | 'modelo' | 'merc' | 'categories' | 'versao';
export type method_specific_key =  'id' | 'unique'

/**
 * @type {method} - É a primeira parte do nome do escopo a ser utilizado
 * @example - Por exemplo: 'join_in_' + 'prod' resulta no na funcão de escopo * join_in_prod(parâmetros), seus parâmetros são
 * exigidos na classe controller.
 * 
 */

export type method_general = 'join_in_' | 'find_by_';

//The specific type for the inner join scope
export type join = IncludeOptions | undefined | Includeable[] | Includeable | ModelOptions<any> 
| Literal

export type find = undefined | ModelOptions<any> 
| Literal | FindOptions | any | void


