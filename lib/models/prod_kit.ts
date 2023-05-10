import { Kit, Produto } from './index';
import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  Scopes
} from 'sequelize-typescript'


@Table
export class ProdKit extends Model{
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number;

  @Column
  declare qtd_prod: number;

  @ForeignKey(() => Produto)
  @Column
  declare id_prod: number

  @ForeignKey(() => Kit)
  @Column
  declare id_kit: number
};