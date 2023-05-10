import {
  Model,
  Column,
  ForeignKey,
  HasMany,
  Table,
  PrimaryKey,
  AutoIncrement,
  Unique,
} from 'sequelize-typescript'
import { Produto } from './produto'


@Table
export class Versao extends Model{
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number
  
  @Unique
  @Column
  declare nome: string

  @HasMany(() => Produto)
  produtos: Produto[]

}
