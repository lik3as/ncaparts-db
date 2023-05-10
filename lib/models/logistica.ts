import {
  Model,
  Table,
  Column,
  PrimaryKey,
  ForeignKey,
  AutoIncrement,
  DataType,
  HasOne,
  Scopes
} from 'sequelize-typescript'
import { Mercadoria } from './mercadoria';


@Table
export class Logistica extends Model{
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number;

  @ForeignKey(() => Mercadoria)
  @Column
  declare id_merc: number;

  @Column
  declare rastreio: string

  @Column(DataType.DECIMAL({precision: 10, scale: 2}))
  declare vol_liq: number

  @Column(DataType.DECIMAL({precision: 10, scale: 2}))
  declare vol_brt: number

  @Column(DataType.DECIMAL({precision: 10, scale: 2}))
  declare c_real: number

  @Column(DataType.DECIMAL({precision: 10, scale: 2}))
  declare c_dolar: number

}