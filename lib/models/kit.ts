import { kit_scopes } from '../scopes/scope_kit';
import { Mercadoria, ProdKit, Produto } from './index';
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
  Scopes,
  HasMany
} from 'sequelize-typescript'

@Scopes(kit_scopes)

@Table
export class Kit extends Model{
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number;
  
  @Column
  declare apelido: string;

  @HasMany(() => Mercadoria)
  mercadorias: Mercadoria[];

  @BelongsToMany(() => Produto, () => ProdKit)
  produtos: Produto[];
}
