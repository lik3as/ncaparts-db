import { fab_scopes} from '../scopes/scopes'

import {
  ProdFab,
  Produto
} from './index'

import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
  Scopes,
  Unique
} from 'sequelize-typescript'


@Scopes(fab_scopes)

@Table
export class Fabricante extends Model{
  @AutoIncrement
  @PrimaryKey
  @Column 
  declare id: number;
  
  @Unique(true)
  @Column
  declare cnpj: string;

  @Column
  declare nome: string;

  @Column
  declare contato: string;

  @Column
  declare local: string;

  @Column
  declare email: string;
  
  @BelongsToMany(() => Produto, () => ProdFab, 'id_fab', 'id_prod')
  produtos: Produto[]
}