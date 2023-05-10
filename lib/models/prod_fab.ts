import {Produto} from './produto';
import {Fabricante} from './fabricante'
import {
  Model,
  Table,
  Column,
  PrimaryKey,
  ForeignKey,
  AutoIncrement,
  Scopes
} from 'sequelize-typescript'


@Table
export class ProdFab extends Model{
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @ForeignKey(() => Produto)
  @Column
  declare id_prod: number;

  @ForeignKey(() => Fabricante)
  @Column
  declare id_fab: number;
}
