import {Cliente} from './cliente'
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  DataType
} from 'sequelize-typescript'

@Table
export class Venda extends Model{
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column
  declare qtd: number;

  @Column
  declare id_merc: number;

  @ForeignKey(() => Cliente)
  @Column
  declare id_cli: number;

  @Column(DataType.DECIMAL({precision: 10, scale: 2}))
  declare valor_total: number;

}
