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
  produto: Produto

  @Column
  @ForeignKey(() => Kit)
  declare id_kit: number;

  @Column
  declare sku: string;

  @Column
  declare importado: boolean;

  @Column(DataType.DECIMAL({precision: 10, scale: 2}))
  declare v_real: number;

  @Column(DataType.DECIMAL({precision: 10, scale: 2}))
  declare v_dolar: number;

  @Column(DataType.DECIMAL({precision: 10, scale: 2}))
  declare v_real_revenda: number;


  @HasMany(() => Logistica)
  logisticas: Logistica[];

}