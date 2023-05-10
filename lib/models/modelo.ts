import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  Unique
} from 'sequelize-typescript'
import {Produto} from './index';


@Table
export class Modelo extends Model{
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Unique
  @Column
  declare nome: string

  @HasMany(() => Produto)
  produtos: Produto[]

}