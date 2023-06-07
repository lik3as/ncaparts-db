import { merc_scopes } from '../scopes/scope_merc';
import {
  Produto,
  Kit,
  Logistica
} from './index'

import {
  PrimaryKey,
  ForeignKey,
  Column,
  Model,
  Table,
  AutoIncrement,
  DataType,
  HasMany,
  BelongsTo,
  Unique,
  Scopes,
  AllowNull,
} from 'sequelize-typescript'

@Scopes(merc_scopes)

@Table({tableName: 'Mercadorias'})
export class Mercadoria extends Model{
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Unique(true)
  @AllowNull(false)
  @Column
  declare nome: string;

  @Column
  @ForeignKey(() => Produto)
  declare id_prod: number;

  @BelongsTo(() => Produto)
  produto: Produto;

  @Column(DataType.ARRAY(DataType.STRING))
  declare skus_relacionados: string[];

  @ForeignKey(() => Kit)
  declare id_kit: number;

  @BelongsTo(() => Kit)
  kit: Kit

  @Column
  declare importada: boolean;

  @Column
  declare disponivel: boolean;

  @Column(DataType.DECIMAL({precision: 10, scale: 2}))
  declare valor_real: number;

  @Column(DataType.DECIMAL({precision: 10, scale: 2}))
  declare valor_real_revenda: number;

  @HasMany(() => Logistica)
  logisticas: Logistica[];

}