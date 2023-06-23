import { FindOptions, IncludeOptions, Includeable, ModelOptions } from "sequelize";
import { Literal } from "sequelize/types/utils";


declare type ScopesOptions = FindOptions | ((...args: any[]) => FindOptions);

export declare type ScopesOptionsGetter = () => {
    [sopeName: string]: ScopesOptions;
};


export type method_specific = 'prod' | 'fab' | 'logi' | 'tipo' | 'subtipo' |
'marca' | 'modelo' | 'merc' | 'categories' | 'versao' | 'related';
export type method_specific_key =  'id' | 'unique'

/**
 * @type {method} - É a primeira parte do nome do escopo a ser utilizado
 * @example - Por exemplo: 'join_in_' + 'prod' resulta no na funcão de escopo * join_in_prod(parâmetros), seus parâmetros são
 * exigidos na classe controller.
 * 
 */

export type method_general = 'join_in_' | 'find_by_';

