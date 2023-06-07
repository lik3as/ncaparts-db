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
  AllowNull,
} from 'sequelize-typescript'


@Table({tableName: 'Mercadorias'})
export class Mercadoria extends Model{
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column
  @ForeignKey(() => Produto)
  declare id_prod: number;

  @BelongsTo(() => Produto)
  produto: Produto;

  @Column(DataType.ARRAY(DataType.STRING))
  declare skus_relacionados: string[];

  @Column(DataType.NUMBER)
  @AllowNull(true)
  @ForeignKey(() => Kit)
  declare id_kit: number | null;

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